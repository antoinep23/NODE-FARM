module.exports = (temp, product) => {
    let output = temp.replace(new RegExp("\\{\\$PRODUCTNAME\\$\\}", "g"), product.productName)
    output = output.replace(new RegExp("\\{\\$IMAGE\\$\\}", "g"), product.image)
    output = output.replace(new RegExp("\\{\\$QUANTITY\\$\\}", "g"), product.quantity)
    output = output.replace(new RegExp("\\{\\$PRICE\\$\\}", "g"), product.price)
    output = output.replace(new RegExp("\\{\\$DESCRIPTION\\$\\}", "g"), product.description)
    output = output.replace(new RegExp("\\{\\$NUTRIENTS\\$\\}", "g"), product.nutrients)
    output = output.replace(new RegExp("\\{\\$FROM\\$\\}", "g"), product.from)
    output = output.replace(new RegExp("\\{\\$ID\\$\\}", "g"), product.id)

    if (!product.organic) output = output.replace(new RegExp("\\{\\$NOT_ORGANIC\\$\\}", "g"), 'not-organic')

    return output
}