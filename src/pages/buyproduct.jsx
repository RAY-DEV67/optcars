import { getDoc,getDocs, collection, doc, addDoc, where, query, deleteDoc } from "firebase/firestore";
// import ImageSlider, { Slide } from "react-auto-image-slider";
import db from "../config/firebase";
import { useState, useEffect, useContext } from "react";
// import { Topnav } from "../components/topnav";
// import { Footer } from "../components/footer";
// import InfiniteScroll from "react-infinite-scroll-component";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { TopCard } from "../components/topcard";
import LoadingSpinner from "../components/loadingspinner";



export function BuyProduct() {
  const [user] = useAuthState(auth);
  const {id} = useParams()
  const {collections} = useParams()
  const {product} = useParams()
  const navigate = useNavigate();
  
//   const setcart = useContext(SetAddCart);
//   const cart = useContext(AddCart);

 
  const [buyProduct, setbuyProduct] = useState(null);
  const [clothsList, setclothsList] = useState([]);
  const [saves, setsaves] = useState([]);
  const [error, seterror] = useState();

  useEffect(() => {
    const topRef = doc(db, collections, id);
    getDoc(topRef).then((doc) => {
      setbuyProduct(doc.data());
    });
  }, [id, collections]);

  console.log(product)

  useEffect(() => {
   try{
    db.collection("Products")
    .where("category", "==", product)
      .limit(10)
      .get()
      .then((collections) => {
        const cloths = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id };
        });
        // const lastDoc = collections.docs[collections.docs.length - 1];
        setclothsList(cloths);
      });
   } catch (err) {
    seterror(err)
    console.log(err)
   }
  }, [product]);
  
  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const images = [buyProduct?.images, buyProduct?.images2, buyProduct?.images3]
const [index, setindex] = useState(0);

useEffect(() => {
    const timer = setInterval(() => {
        setindex((index + 1) % images.length)
    }, 3000)

    return () => clearInterval(timer)
}, [index, images.length]);

console.log(window.location.pathname)

// const phone = 09016011178


  return (
    <div className="pt-[4rem] bg-[#333e51] text-white productfont">
      {/* <Topnav /> */}
     {buyProduct ? <div>
     <div className="flex justify-center relative mt-[2rem] mx-[0.5rem]">
      <img alt="img2" src={images[index]} className="object-contain topcard rounded-[1rem]" />
         </div>   


        

      <div className="buyProductBorder mb-[1rem] mt-[1rem] mx-[1rem] pb-[1rem] text-left">
        <p className="text-2xl font-bold mb-[0.5rem]">{buyProduct?.title}</p>
        <div className="flex justify-left">
          <p className="ml-[0.2rem] text-xl">{formatCur(buyProduct?.price , 'en-NG' , "NGN")}</p>
        </div>
      </div>

      <div className="mx-[1rem] text-left">
        {/* <h1 className="text-2xl mb-[2rem]">Product Details:</h1> */}
        <div className="mb-[0.3rem]">
          <p className="font-bold mb-[0.5rem]">Brand:<span className="font-normal"> {buyProduct?.category}</span></p>
          {/* <p> {buyProduct?.description}</p> */}
        </div>
        <div className="mb-[0.3rem]">
          <p className="font-bold mb-[0.5rem]">Condition:<span className="font-normal"> {buyProduct?.condition}</span></p>
          {/* <p> {buyProduct?.description}</p> */}
        </div>
        <div className="mb-[1rem]">
          <p className="font-bold mb-[0.5rem]">Description / Product info:</p>
          <p> {buyProduct?.description}</p>
        </div>
              </div>

              <div className="flex flex-col items-center">
              
              <a href= "https://wa.link/2eeyct" target="_Blank" className="flex border-[#2099fe] border bg-[#2099fe] py-[0.2rem] lg:py-[0.8rem] lg:w-[20%] justify-center w-[40%] items-center">
                <button className="mr-[0.3rem]">Whatsapp</button>
                <svg fill="#000000" width="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z"></path><path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z"></path></g></svg>
              </a>
              </div>

              <div className="flex flex-col items-center mt-[1rem]">
              <a href="https://www.instagram.com/optcars_01/?hl=en" target="_blank" className="lg:py-[0.8rem] lg:w-[20%] flex border-[#2099fe] border bg-[#2099fe] py-[0.2rem] justify-center w-[40%] items-center">
                <button className="mr-[0.3rem]">Instagram</button>
                <svg viewBox="0 0 192 192" width="25px" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#000000" stroke-width="12" d="M96 162c-14.152 0-24.336-.007-32.276-.777-7.849-.761-12.87-2.223-16.877-4.741a36 36 0 0 1-11.33-11.329c-2.517-4.007-3.98-9.028-4.74-16.877C30.007 120.336 30 110.152 30 96c0-14.152.007-24.336.777-32.276.76-7.849 2.223-12.87 4.74-16.877a36 36 0 0 1 11.33-11.33c4.007-2.517 9.028-3.98 16.877-4.74C71.663 30.007 81.847 30 96 30c14.152 0 24.336.007 32.276.777 7.849.76 12.87 2.223 16.877 4.74a36 36 0 0 1 11.329 11.33c2.518 4.007 3.98 9.028 4.741 16.877.77 7.94.777 18.124.777 32.276 0 14.152-.007 24.336-.777 32.276-.761 7.849-2.223 12.87-4.741 16.877a36 36 0 0 1-11.329 11.329c-4.007 2.518-9.028 3.98-16.877 4.741-7.94.77-18.124.777-32.276.777Z"></path><circle cx="96" cy="96" r="30" stroke="#000000" stroke-width="12"></circle><circle cx="135" cy="57" r="9" fill="#000000"></circle></g></svg>
              </a>
              </div>
</div>  : <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
                  <LoadingSpinner/>
                  </p> }
  

      <h2 className="m-[2rem] text-left text-2xl lg:text-4xl text-white">Similar Products:</h2>
<div className="flex lg:flex flex-wrap gap-3 justify-center pb-[1rem] bg-[#333e51]">
    
{clothsList.map((post, index) => {
            return (
              <div
              key={index}
              onClick={() => {
                navigate(`/Buy/Products/${post.category}/${post.id}`)
              }}
              className=""
            >
                <TopCard post={post} />
              </div>
            );
          })}
</div>
      {/* <Footer /> */}
    </div>
  );
}