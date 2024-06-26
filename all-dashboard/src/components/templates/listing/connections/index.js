import React, { useState } from 'react'
import Image from 'next/image'
import Divider from './divider'
import Title from './title'
import Button from './button'
import Dialog from 'ui/dialog'
import ConfirmDialog from "ui/dialog/confirmDialog";
import { useListingDetailsSelector } from 'store/selectors/listing'
import { useDispatch } from 'react-redux'
import { updateListingDetails } from 'store/slices/listing'


const icalCalenderSyncData = [
  { id: 1, title: 'Airbnb', value: 'airbnb' },
  { id: 2, title: 'Booking.com', value: 'bookingdotcom' },
  { id: 4, title: 'Vrbo', value: 'vrbo' },
  { id: 4, title: 'Hostaway', value: 'hostaway' }
]

const connectChannelManager = [
  { id: 1, title: 'Hostaway', value: 'hostaway' }
]

const importDataFromOtherListing = [
  { id: 1, title: 'Airbnb', value: 'airbnb' },
]

const viaEmail = [
  { id: 1, email: 'joedoe@gmail.com' },
  { id: 2, email: 'jackjohns@gmail.com' }
]

const shareData = [
  { id: 1, name: "Copy link", iconPath: "/assets/icons/shareCopylink.png" },
  { id: 2, name: "Email", iconPath: "/assets/icons/shareEmail.png" },
  { id: 3, name: "Message", iconPath: "/assets/icons/shareMessage.png" },
  { id: 4, name: "Messenger", iconPath: "/assets/icons/shareMessenger.png" },
  { id: 5, name: "Facebook", iconPath: "/assets/icons/shareFacebook.png" },
  { id: 6, name: "Twitter", iconPath: "/assets/icons/shareTwitter.png" },
  { id: 7, name: "WhatsApp", iconPath: "/assets/icons/shareWhatsapp.png" },
  { id: 8, name: "Embed", iconPath: "/assets/icons/shareEmbed.png" }
]

function IcalConnections() {
  const dispatch = useDispatch();
  const listingdetails = useListingDetailsSelector();
  const [showImportIcalDialog, setShowImportIcalDialog] = useState(false)
  const [vendor, setVendor] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [showConfirm, setShowConfirm] = React.useState("");

  const AddIcal = () => {
    if (!vendor) return;
    if (!url) return;
    if (!name) return;
    const clonedArray = listingdetails?.ical.map(a => { return { ...a } }) || [];

    const checkIndex = clonedArray.findIndex(e => e.name == vendor);
    if (checkIndex == -1) {
      clonedArray.push({
        name: vendor,
        label: name,
        url
      })
    } else {
      clonedArray[checkIndex].url = url;
      clonedArray[checkIndex].label = name;
    }
    dispatch(updateListingDetails({ ical: clonedArray }));
    setShowImportIcalDialog(!showImportIcalDialog);
  }

  const removeConnection = () => {
    const clonedArray = listingdetails?.ical.map(a => { return { ...a } }) || [];
    dispatch(updateListingDetails({ ical: clonedArray.filter(e => e.name != showConfirm) }));

    setShowConfirm(null);
  }

  const getVendorName = (v) => {
    return icalCalenderSyncData.find(e => e.value == v)?.title || '';
  }

  return (
    <>
      <ConfirmDialog
        confirmText="Are you sure you want remove?"
        confirmAction={() => removeConnection()}
        declineAction={() => setShowConfirm(null)}
        open={!!showConfirm}
      />
      <div className='flex items-start justify-between h-full w-full'>

        <div className='w-[750px] overflow-y-auto'>
          <div className='flex items-center justify-between'>
            <Title text="Sync Calender" />
            <Image alt="ical-sync" src="/assets/icons/reloadIcon.png" height="20" width="20" />
          </div>

          <div className='flex items-center justify-between mt-8'>
            <span className='text-[#5C5C5C] leading-5 text-lg font-normal'>Export calender</span>
            <span className='text-[#CD264F] leading-5 text-base font-normal underline'>{process.env.NEXT_PUBLIC_WEBSITE_URL || ''}/listing/{listingdetails?.permalink}?ical</span>
          </div>

          <Divider />

          <div className='mt-10 flex items-center justify-between'>
            <h2 className='text-[#5C5C5C] leading-5 text-xl font-normal'>Import calender</h2>
            <Button onClick={() => setShowImportIcalDialog((prev) => !prev)} text="Import ical" />
          </div>

          <div className='mt-8'>
            {listingdetails?.ical && listingdetails?.ical?.length > 0 && (
              listingdetails?.ical.map((data, idx) => {
                return (
                  <div key={idx} className='flex items-center justify-between mt-8'>
                    <div className='flex items-center gap-x-4'>
                      <Image alt={`${getVendorName(data?.name)}-icon`} src={`/assets/icons/${data?.name}.png`} height="32" width="32" />
                      <span className='text-[#000000] font-normal text-base leading-5'>{getVendorName(data?.name)} - {data?.label}</span>
                    </div>

                    <div className='flex items-center gap-x-2'>
                      <Image alt="ical-sync" src="/assets/icons/reloadIcon.png" height="16" width="14" />
                      <Image className='cursor-pointer' onClick={() => setShowConfirm(data?.name)} alt="delete-ical" src="/assets/icons/icalDelete.png" height="20" width="20" />
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <Divider className='mt-8' />

          <div className='mt-8 flex items-center justify-between'>
            <Title As="h2" text="Connect channel manager" />
            <Button text="Connect" />
          </div>

          <div className='mt-8'>
            {connectChannelManager?.length > 0 && (
              connectChannelManager?.map((data, idx) => {
                return (
                  <div key={idx} className='flex items-center gap-x-8'>
                    <div className='flex items-center gap-x-2'>
                      <Image alt={`${data?.title}-icon`} src={`/assets/icons/${data?.value}.png`} height="32" width="32" />
                      <span className='text-[#000000] font-normal text-base leading-5'>{data?.title}</span>
                    </div>

                    <div className='flex items-center gap-x-2'>
                      <Image alt="ical-sync" src="/assets/icons/reloadIcon.png" height="16" width="14" />
                      <Image alt="delete-ical" src="/assets/icons/icalDelete.png" height="20" width="20" />
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <Divider />

          <div className='mt-8 flex items-center justify-between'>
            <Title As="h3" text="Import data from other Listing OTA" />
            <Button text="Import OTA" />
          </div>

          <div className='mt-8'>
            <span className='text-[#5C5C5C] leading-5 text-lg font-normal'>Connected list</span>
          </div>

          <div className='mt-8'>
            {importDataFromOtherListing?.length > 0 && (
              importDataFromOtherListing.map((data, idx) => {
                return (
                  <div key={idx} className='flex items-center gap-x-8'>
                    <div className='flex items-center gap-x-2'>
                      <Image alt={`${data?.title}-icon`} src={`/assets/icons/${data?.value}.png`} height="32" width="32" />
                      <span className='text-[#000000] font-normal text-base leading-5'>{data?.title}</span>
                    </div>

                    <div className='flex items-center gap-x-2'>
                      <Image alt="ical-sync" src="/assets/icons/reloadIcon.png" height="16" width="14" />
                      <Image alt="delete-ical" src="/assets/icons/icalDelete.png" height="20" width="20" />
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <Divider className='mt-8' />

          <div className='mt-8 flex items-center justify-between'>
            <Title As="h3" text="Specific Access to Co-Host" />
            <Button text="Add co-host" />
          </div>

          <div className='mt-8'>
            <Title As="h5" text="Via email" />
            {viaEmail?.length > 0 && (
              viaEmail.map((data, idx) => {
                return (
                  <div key={idx} className='flex justify-between items-center mt-8'>
                    <span className='text-[#5C5C5C] leading-5 font-normal text-lg'>{data?.email}</span>
                    <div className='flex items-center gap-x-[10px]'>
                      <button className='text-[#CD264F] underline leading-5 font-normal text-lg'>Edit access</button>
                      <Image alt="delete-ical" src="/assets/icons/icalDelete.png" height="20" width="20" />
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <Divider className='mt-8' />

          <div className='mt-8'>
            <Title As="h6" text="Share Property Link" />
            <p className='text-[#CD264F] leading-5 text-base font-normal underline mt-8'>{process.env.NEXT_PUBLIC_WEBSITE_URL || ''}/listing/{listingdetails?.permalink}</p>
            <p className='mt-8'>Share</p>
            <div className='mt-6 flex flex-wrap items-center justify-between'>
              {shareData?.map((data) => {
                return (
                  <div className='flex items-center justify-between border border-[#D9D9D9] rounded-[86px]  mb-2 w-[360px] h-[64px] px-[24px]'>
                    <span className='text-[#5C5C5C] leading-5 text-lg font-normal'>{data?.name}</span>
                    <Image alt="ical-sync" src={`${data?.iconPath}`} height="30" width="30" />
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        {/* <div className='bg-[#FFF9EA] h-[400px] w-[400px] rounded-2xl fixed right-10'></div> */}

        <Dialog contentClass='bg-white w-[400px] min-h-[390px] rounded-md' open={showImportIcalDialog} onClose={() => setShowImportIcalDialog((prev) => !prev)}>
          <Title As="h6" text="Import ical" className='pt-6 pl-5' />
          <div className='px-4 flex flex-col pt-5 justify-between'>
            <div>
              <div className='flex flex-col'>
                <label>Vendor Name</label>
                <select className='border border-black rounded-md' onChange={(e) => setVendor(e.target.value)}>
                  <option hidden></option>
                  {icalCalenderSyncData.map(ee => {
                    return <option key={ee.value} value={ee.value}>{ee.title}</option>;
                  })}
                </select>
              </div>

              <div className='flex flex-col mt-3'>
                <label>Source Name</label>
                <input type='text' className='border border-black rounded-md' onChange={(e) => setName(e.target.value)} />
              </div>

              <div className='flex flex-col mt-3'>
                <label>Source Url</label>
                <input type='url' className='border border-black rounded-md' onChange={(e) => setUrl(e.target.value)} />
              </div>

              {/* <div className='flex flex-col mt-8'>
                    <label></label>
                    <input className='border border-black rounded-md'/>
                 </div> */}

            </div>

            <div className='flex items-center justify-between mt-8'>
              <button className='bg-black text-white p-3 rounded-md' onClick={() => setShowImportIcalDialog((prev) => !prev)}>Close</button>
              <button className='bg-black text-white p-3 rounded-md' onClick={AddIcal}>Add Source</button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  )
}

export default IcalConnections