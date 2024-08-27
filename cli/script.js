import cron from "node-cron";

const username = process.argv[3];
// const apikey = process.argv[3];  We can pass apikey
const fetchUserRepos = async (username) => {
    const url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching repositories');
        }

        const data = await response.json();

        await fetch('http://localhost:3000/send-analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data,
            }),
        });

        console.log(`Repositories for ${username}:`, data[0]?.name);
        return data;
    } catch (error) {
        console.error(`Failed to fetch repositories for ${username}:`, error);
    }
};

const runScript = (username) => {
    console.log(`Fetching repositories for ${username} every minute`);
    fetchUserRepos(username);
};


cron.schedule('* * * * *', () => runScript(username));
console.log(`Cron job scheduled to run every minute for ${username}`);