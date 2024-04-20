import Image from "next/image"
import nextImage from '/public/next.svg'
export default function List() {
    let arrayA = [2,3,4]
    let productList = ['Tomato', 'Melon', 'Apple']

    return (
        <div>
            <div className="flex flex-row items-center">
                <SideNav />
                {
                    productList.map((a,i) => {
                        return (
                            <div className="food" key={i}>
                                {/*<Image src={nextImage} className="food-img"/>*/}
                                {/*<img src="/next.svg" className="food-img"/>*/}
                                <img src={`/food${i}.png`} className="food-img"/>
                                <h4>{productList[i]} $40</h4>
                            </div>
                        )
                    })
                }
            </div>



        </div>
    )
}

function SideNav() {
    return (
        <aside className="bg-bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
            <nav className="text-white text-base font-semibold pt-3">
                <a href="index.html"
                   className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                    <i className="fas fa-tachometer-alt mr-3"></i>
                    상품관리
                </a>
                <a href="blank.html"
                   className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
                    <i className="fas fa-sticky-note mr-3"></i>
                    분류관리
                </a>
            </nav>
        </aside>
    )
}
