export const fetchData = async () => {
    try {
        const response = await fetch('stackline_frontend_assessment_data_2021.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
};