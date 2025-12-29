import { useEffect } from "react"

function Latihan() {

    const array = [
        {id: 1, name: "ayam"},
        {id: 2, name: "ikan"},
        {id: 3, name: "gorengan"},
        {id: 4, name: "kopi"},
        {id: 5, name: "teh"},
    ]

 useEffect(() => {
  array.forEach(item => console.log(item.name))
}, [])


    return (
    <>
    <div>
        <ul>
            {array.map(item =>
                <div key={item.id}>
                    <div>{item.name}</div>
                </div>
            )}
        </ul>
        <br></br>

        <div>Tombol</div>
    </div>    
    </>)

}

export default Latihan