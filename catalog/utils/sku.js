/**
 * Generates a SKU (Stock Keeping Unit) for a product based on its name.
 *
 * @param {string} name - The name of the product.
 * @returns {string} - The generated SKU.
 */
function generateSKU(name) {
     // Convert product name to uppercase and remove spaces
    const nameCode = name.replace(/\s+/g, '').toUpperCase();

    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').substring(0, 14);
     // Generate a timestamp string without separators

    return `${nameCode}-${timestamp}`;
} 


module.exports = generateSKU;