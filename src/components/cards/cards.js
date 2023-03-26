import React, {useEffect, useState} from 'react';
import RamService from '../../servises/ramService';
import CardItem from '../card-item';
import Spinner from '../spiner';
import ShowModal from '../show-modal';
import InfiniteScroll from 'react-infinite-scroll-component';
import './cards.scss';

export default function Cards() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [pagesCount, setPagesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const ramService = new RamService();

      try {
        ramService.getCharacters()
          .then((characters) => {
            setData(characters.results);
            setIsLoading(false);
            setPagesCount(characters.info.pages);
          })
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const handleOnClick = (e) => {
    const clickedCard = e.currentTarget;
    setSelectedNumber(parseInt(clickedCard.dataset.cardNumber) - 1)

    if (isVisible === false) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  const fetchNextPage = () => {
    setPageNumber(pageNumber + 1);
    setIsLoading(true);

    if (pagesCount > pageNumber) {
      const fetchMoreData = async () => {
        const ramService = new RamService();

        try {
          ramService.getCharacters(pageNumber)
            .then((characters) => {
              const allData = [...data, ...characters.results]
              setData(allData);
            })
        } catch (error) {
          console.log("error", error);
        }
      };

      fetchMoreData();
    } else {
      setHasMoreData(false);
    }

    setIsLoading(false);
  }

  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
        <InfiniteScroll
          dataLength={data ? data.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasMoreData}
          loader={<Spinner />}
        >
        <div className='wrapper-cards'>
          { data.map(char => (
              <div
                data-card-number={char.id}
                key={ char.id }
                onClick={(e) => handleOnClick(e)}
              >
                <CardItem data={char}/>
              </div>
            )
          ) }
          <button className='top'
                  onClick={() => {
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                  }}
          >
            вверх
          </button>
        </div>
          { isVisible && <ShowModal data={ data[selectedNumber] } isDisplay={ setIsVisible }/> }
        </InfiniteScroll>
        </>
    )
  }
}