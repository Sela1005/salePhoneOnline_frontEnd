import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SignInPage from "../pages/SignInPage/SignInPage"
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProductDetails from "../pages/ProductDetailsPage/ProductDetailsPage"
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSucces";
import ProfilePage from "../pages/Profile/ProfilePage";
import OutstandingPhonePage from "../pages/OutstandingPhonePage/OutstandingPhonePage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: true,
        isPrivate: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/product-details/:id',
        page: ProductDetails,
        isShowHeader: true
    },
    {
        path: '/outstandingphone',
        page: OutstandingPhonePage,
        isShowHeader: true
    },
    

]