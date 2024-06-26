import React, { useEffect, useState } from 'react'
import CityPageAccordion from '../../global/citypageAccordion'
import Image from 'next/image'

function index({ all_faqs }) {
    const [faqs, setFaqs] = useState([]);
    const [faqImageUrl, setFaqImageUrl] = useState();
    // const [isFaqActive, setIsFaqActive] = useState(false);
    useEffect(() => {
        // getFaqs();
        setFaqs(all_faqs.allFaqs);
        setFaqImageUrl(all_faqs.defaultImageUrl);
    }, [])

    // useEffect(() => {
    //     if(faqs.length > 0) {
    //         setFaqImageUrl(all_faqs.defaultImageUrl);
    //     }
    // }, [])

    function getFaqs() {
        // setFaqs(all_faqs)
    }

    function hanldeFaqClick(index) {
        let myList = [...faqs];
        myList.forEach((item, index1) => {
            if(index !== index1) {
                item.isActive = false
            }
        })
        myList[index].isActive = !myList[index].isActive;
        setFaqImageUrl(myList[index].imgurl)
        setFaqs([...myList]);
    }

    return (
    <div className=''>
        <div className='flex flex-col'>
            <span className='text-[22px] font-semibold leading-7'>Frequently Asked Questions</span>
            <span className='text-base font-normal'>Have questions? we are here to help</span>
        </div>
        <div className='sm:flex sm:flex-col lg:flex-row'>
            <div className='hidden sm:block mr-16 mt-7 w-[100%] h-[400px] relative'>
                { faqImageUrl && <Image alt="faqimage-url" src={`${faqImageUrl}`} loading='lazy' fill className='object-cover rounded-xl' /> }
            </div>
            <div className=''>
            {
                faqs?.map((faq, index) => <CityPageAccordion faq={faq} index={index} hanldeFaqClick={hanldeFaqClick} />)
            }
            </div>
           
        </div>
    </div>
  )
}

export default index