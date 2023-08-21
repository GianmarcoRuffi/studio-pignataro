import Link from 'next/link'
import Image from 'next/image';

export default function Contacts() {
  return (
    
   <div className='contacts-container flex justify-center items-center'>

     <div className='wrapper row'>

       <div className='image-container col-auto responsive'><Image src="/ufficio_01.jpg" 
 
        width="582"
        height="388"
        className='responsive'
        /></div>

        <div className='contacts-box col-auto'> 
        
       
         <ul className='contacts text-sm'>
        <li>Email</li>
         <li>Phone</li>
         <li>Address</li>
          </ul>
        
        </div>

        </div>

   </div>

  )
  }