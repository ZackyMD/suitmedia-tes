import Header from "@/components/Header";
import Banner from "@/components/Banner";

export default function Layout({ children }) {
    return(
        <>
        <Header/>
        <Banner/>
        <main>

            {children}
        
        </main>
        </>
    )
}