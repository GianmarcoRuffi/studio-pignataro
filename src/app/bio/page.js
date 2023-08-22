import Link from 'next/link'
import Image from 'next/image';
import styles from '../styles/Bio.module.css'

export default function Bio() {
    return <main>

<div className={styles.container}>

<div className='bio-container flex justify-center items-center'>

<div className='wrapper row grid grid-cols-2 gap-6'>


<div className='image-container col-2 responsive'><Image src="/bio_resized.jpg" 
 
        width="386"
        height="386"
        className='responsive rounded-full'
        /></div>

        <div className='bio-box col-2 max-w-xs flex-row justify-center items-center text-justify h-8 '> 
        
       <h1>Gianluca Pignataro</h1>

       <h3>Architect-Designer</h3>

       <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla, tortor nec consectetur eleifend, ante nibh dictum mi, hendrerit pharetra urna arcu sit amet justo. Nam leo est, egestas sed mauris id, porttitor placerat nisl. Quisque enim sapien, venenatis nec fermentum aliquet, placerat sed velit. Sed tincidunt ut dolor eget pellentesque. Pellentesque egestas ante at mi mattis, sed laoreet arcu ullamcorper. Suspendisse non suscipit eros, in placerat metus. Mauris elementum nunc quis ultricies fringilla. Phasellus pharetra, arcu at efficitur vulputate, ante magna tincidunt neque, sed ornare enim dolor eu turpis. Nulla eros velit, tincidunt ut luctus quis, sollicitudin quis ligula. Proin in suscipit tortor, non imperdiet ex. Etiam vel fringilla massa, at tincidunt mi.

Sed laoreet ex vel mi ultrices, quis viverra velit aliquet. Aenean hendrerit erat at nisl pretium ullamcorper. Aliquam erat volutpat. Aliquam rutrum nulla condimentum, aliquam turpis at, gravida lacus. Ut interdum justo vel urna gravida fermentum. Mauris aliquam ac diam eu volutpat. Ut placerat, quam eu vehicula consectetur, ante purus ultricies neque, vel malesuada lacus mi quis enim. Aliquam tortor quam, sodales non viverra sit amet, congue in sapien.

Morbi at pellentesque mi. Aliquam blandit libero a iaculis cursus. Mauris tristique dui vitae pharetra tincidunt. Fusce at laoreet turpis, vel semper sapien. Ut lacinia urna a tincidunt iaculis. Nullam diam dui, laoreet porttitor sapien ut, pellentesque tincidunt sem. Aenean posuere dapibus neque maximus commodo. Morbi porta metus non pharetra ullamcorper. Cras nec ullamcorper dui, ut lobortis lacus. Mauris sit amet metus sit amet libero lacinia faucibus. Etiam at velit ut ante pellentesque elementum. Suspendisse arcu ligula, molestie sed cursus sed, consectetur quis augue. Suspendisse potenti.

Morbi ut condimentum est. Phasellus in vestibulum magna. Vivamus sem est, placerat sit amet ornare non, lacinia quis urna. Nunc quam diam, vehicula id sapien quis, faucibus dignissim ex. Duis fermentum augue at ante imperdiet venenatis. Aenean et elit bibendum, ultricies justo et, consectetur nulla. Vestibulum rutrum porta mauris, ut lobortis urna vehicula et. In condimentum porta leo, in auctor velit luctus eget. Quisque sed lectus eu diam lobortis tincidunt eu et orci. In imperdiet porttitor ipsum sed elementum. Sed aliquet tellus sollicitudin pharetra vestibulum. Maecenas dapibus tristique magna, et venenatis dui iaculis vel. Cras lacinia rhoncus ex vitae vulputate. Suspendisse potenti. 
        
        
       </p>
       
        
       
        
        </div>

        </div>


</div>
</div>





    </main>
  }