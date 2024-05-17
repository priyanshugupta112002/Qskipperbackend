
import Header from './Header'
import "../../css /Header.css"
const Layout =({children})=>{
    return(
        <div className='container'>
            <Header />
            <main>     
                 {children}

            </main>
      

        </div>
    )


}
export default Layout