export default function generateUniqueFileName() {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const uniqueFileName = `${timestamp}_${randomString}`;
    return uniqueFileName;
}
  