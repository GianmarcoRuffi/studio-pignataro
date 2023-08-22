import Link from 'next/link'
import Image from 'next/image';

export default function Contacts() {
  return (
    
   <div className='contacts-container flex justify-center items-center'>

     <div className='wrapper row grid grid-cols-2'>

       <div className='image-container col-auto responsive'><Image src="/ufficio_01.jpg" 
 
        width="582"
        height="388"
        className='responsive'
        /></div>

        <div className='contacts-box col-auto flex justify-center items-center max-w-xs'> 
        
       
       
         <ul className='contacts text-sm'>
        <li>Email@gmail.com</li>
         <li>651 | 302 | 0420</li>
         <li>Saint Paul Minnesota 55114</li>
         <li>Linkedin</li>
          </ul>
        
        </div>

        </div>

   </div>

  )
  }