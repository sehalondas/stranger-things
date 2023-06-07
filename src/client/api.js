const cohortName = '2303-ftb-et-web-pt';
const baseUrl = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const fetchPost = async () => {
    try {
        const response = await fetch(`${baseUrl}`);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        return result;
    } catch (error) {
        console.error(error);
    }
};

fetchPost()