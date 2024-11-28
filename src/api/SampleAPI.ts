export const getClient = async () => {
    try {
        const res = await fetch('');

        if (res.ok) {
            return res.json();
        }

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        //add other error instances if there are any.

        throw new Error("Something went wrong");
    }
}