
const baseUrl ='http://localhost:4747'
export const adminApiList = {
    adminLogin: `${baseUrl}/admin/auth/login`,
    adminSignup: `${baseUrl}/admin/auth/signup`,

    getProduct: `${baseUrl}/admin/product`,
    listProduct: `${baseUrl}/admin/product/list`,
    createProduct: `${baseUrl}/admin/product/create`,
    updateProduct: `${baseUrl}/admin/product/update`,

    getCart: `${baseUrl}/admin/cart/list`,
    updateCart: `${baseUrl}/admin/cart/update`,
}

export const webApiList = {
    login: `${baseUrl}/web/auth/login`,
    signup: `${baseUrl}/web/auth/signup`,

    getProduct: `${baseUrl}/web/product`,
    listProduct: `${baseUrl}/web/product/list`,

    getCart: `${baseUrl}/web/cart/list`,
    updateCart: `${baseUrl}/web/cart/update`,
}   