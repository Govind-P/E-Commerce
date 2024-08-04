import React,{useState,useEffect} from 'react';
import AddProductMenu from '../components/addProductMenu.js';
import backendApi from '../common/api.js';
import ProductCard from '../components/productCard.js'




const AllProducts = () => {
  const [addProductMenuOpen, setAddProductMenuOpen] = useState(false);
  const [allProduct,setAllProducts]=useState([]);

  const fetchProduct=async()=>{
    const res=await fetch(backendApi.all_products.url,{
      method:backendApi.all_products.method,
      credentials:'include'
    });
    const resData=await res.json();
    console.log(resData);
    if(resData.success){
      setAllProducts(resData.data);
    }
  }

  useEffect(()=>{
    fetchProduct();
  },[]);

  return (
    <div className='h-full w-full'>
      <div className='flex justify-between px-3 py-3 items-center'>
        <h1 className='font-bold text-blue-950'>All Products</h1>
        <button className='bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-800 hover:text-white' onClick={()=>setAddProductMenuOpen(true)}>Add Product</button>  
      </div>
      <div className='overflow-hidden h-[70vh]'>
        <div className="h-full overflow-y-auto">
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 overflow-y-auto'>
            {
              allProduct.map((product,index)=>(
                <ProductCard key={product._id} product={product}/>
              ))
            }
          </div>
        </div>
      </div>
      
      

      {addProductMenuOpen && (
        <AddProductMenu
        onClose={()=>setAddProductMenuOpen(false)}
        fetchProduct={fetchProduct}/>
      )}

    </div>

  )
}

export default AllProducts