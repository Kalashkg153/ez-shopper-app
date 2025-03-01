import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CategoryComponent } from './category/category.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { ProductComponent } from './product/product.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './adminRightsComponent/add-product/add-product.component';
import { AddCategoryComponent } from './adminRightsComponent/add-category/add-category.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path : "", component : HomeComponent
    },
    {
        path : "profile/:username" , component : ProfileComponent
    },
    {
        path : "shop" , component : ShopPageComponent
    },
    {
        path : "login" , component : LoginPageComponent
    }, 
    {
        path : "register" , component : RegisterPageComponent
    }, 
    {
        path : "admin" , component : AdminComponent ,
        children : [
            {
                path : "add-product", component : AddProductComponent
            },
            {
                path : "add-category", component : AddCategoryComponent
            }
        ]
    },
    {
        path : "cart" , component : CartComponent
    },
    {
        path : "searched-product", component : SearchProductComponent
    },
    {
        path : "forgot-password" , component : ForgotPasswordComponent
    },
    {
        path : "reset-password" , component : ResetPasswordComponent
    },
    {
        path : 'category/:name' , component : CategoryComponent
    },
    {
        path : 'contact-us' , component : ContactComponent
    },
    {
        path : "checkout-cart", component : CheckoutComponent
    },
    {
        path : "product-details/:id", component : ProductComponent
    }
];
