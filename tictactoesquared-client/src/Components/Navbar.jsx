import Title from "./Title"
import Name from "./Name"
const Navbar = () => { 

    return ( 
        <nav className="relative px-4 py-0 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <Title/>
                <Name/>
                
        </div>
    </nav>
    )

}

export default Navbar