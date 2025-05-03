export const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => {
                        if (typeof reader.result === 'string') {
                                resolve(reader.result)
                        } else {
                                reject(new Error('Failed to convert file to base64'))
                        }
                }
                reader.onerror = () => reject(new Error('Error reading file'))
                reader.readAsDataURL(file)
        })
}