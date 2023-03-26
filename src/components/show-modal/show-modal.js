import React, {useEffect, useState} from 'react';
import './show-modal.scss';
import RamService from '../../servises/ramService';

export default function ShowModal( {data, isDisplay} )   {
    const urlEpisode = data.episode[0];
    const [dataModal, setDataModal] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const ramService = new RamService();

            try {
                ramService.getEpisode(urlEpisode)
                  .then((episode) => {
                      setDataModal(episode);
                  })
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);
    const closeModal = () => {
        isDisplay(false);
    };

    return (
       <div className='modal' onClick={closeModal}>
           <div className='modal-content'>
               <div className='--color'>
                   <img src={data.image} alt='photo'className='modal-content__image' />
               </div>
               <div className='modal-content__description'>
                    <div>
                        <h3>name:</h3>
                        <p>{data.name}</p>
                        <h3>status:</h3>
                        <p> {data.status}</p>
                        <h3>species:</h3>
                        <p>{data.species}</p>
                        <h3>gender:</h3>
                        <p>{data.gender}</p>
                    </div>
                   <div>
                       <h3>origin:</h3>
                       <p>{data.origin.name}</p>
                       <h3>location:</h3>
                       <p> {data.location.name}</p>
                       <h3>episode:</h3>
                       <p>{dataModal.episode}</p>
                   </div>
               </div>
           </div>
       </div>
    );
}