import "tailwindcss/tailwind.css";
import "../styles.css";
import "../public/css/slider.css"
// import "../public/css/boot.css";
import "../public/css/slick.min.css";
// import "../public/css/boxicons.min.css";
// import "tailwindcss/tailwind.css";

import "../public/css/slick-theme.min.css";

import { Provider } from "next-auth/client";
import Header from "../components/Header";
import AppHeader from "../components/header/index";


function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      {/* <Header /> */}
      <AppHeader />
      <Component {...pageProps} />
      <footer class="bg-gray-800 p-4">
        <div class="container mx-auto text-center">
          <p>&copy; 2023 streamtonight. All rights reserved.</p>
        </div>
      </footer>
    </Provider>
  );
}

export default MyApp;
