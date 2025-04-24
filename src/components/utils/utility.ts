export const formatDate = ( dateString : string) => {
    const date = new Date(dateString);
    const options = { year : 'numeric' as const, month : 'short' as const};
    return date.toLocaleString('en-US',options)
}

export const getBase64 = async (file: File | null): Promise<string> => {
    if (file === null) return "";
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result); // Resolve with the base64 string
            } else {
                reject(new Error('Failed to read file as base64.'));
            }
        };
        reader.onerror = (error) => reject(error); // Reject on error
    });
};
