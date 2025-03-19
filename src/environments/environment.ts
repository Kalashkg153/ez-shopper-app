
const BASE_URL = "http://localhost:8080/";

export const environment = {
    production: false,
    
    cartUrls : {
        addItemsToCart : BASE_URL + "cart/addToCart",
        decreaseQuantityFromCart : BASE_URL + "cart/decreaseQuantityFromCart",
        removeItemFromCart : BASE_URL + "cart/removeItemFromCart"
    },

    productUrls : {
        addNewProduct : BASE_URL + "admin/saveProduct",
        trendingProducts : BASE_URL + "trendingProducts",
        latestProducts : BASE_URL + "latestProducts",
        allProducts : BASE_URL + "getAllProducts",
        productByCategory  : BASE_URL + "getProductsByCategory/",
        productById : BASE_URL + "getProductById/",
        productImage : BASE_URL + "productImageData/",

    },

    userUrls : {
        login : BASE_URL + "auth/login",
        register : BASE_URL + "auth/register",
        updateProfile : BASE_URL + "auth/update-profile/",
        updatePassword : BASE_URL + "auth/update-password/",
        userDetails : BASE_URL + "user/",
        resetPassword : BASE_URL + "reset-password",
        sendPasswordResetLink : BASE_URL + "forgetPasswordLink",
        getAllUsers : BASE_URL + "admin/users"
    },

    categoryUrls : {
        activeCategories : BASE_URL + "activeCategories",
        categories : BASE_URL + "admin/categories",
        deleteCategory : BASE_URL + "admin/deleteCategory/",
        addCategory : BASE_URL + "admin/saveCategory"
    },

    orderUrls : {
        placeOrder : BASE_URL + "placeOrder",
        getOrders :  BASE_URL + "user/getOrders/",
        deleteOrder : BASE_URL + "order/",
        getAllOrders : BASE_URL + "admin/getAllOrders",
        updateOrderStatus : BASE_URL + "admin/updateOrderStatus/"
    },



    featureFlag: true
  };