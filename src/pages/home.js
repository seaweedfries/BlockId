import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1ZGJEMzM4N2U3ZDJhNTRCODQwYkFjOUVmZGIwOTJkNGRGMTVGZDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTI4NjczOTA1MCwibmFtZSI6IkJsb2NrSUQifQ.PetsVefIO9rpoSHXg6EYwzLdgexFGEmh02yH0ORMLVQ';

function Home() {
	const [petsData, setPetsData] = useState([])
  
	useEffect(() => {
		const loadPets = async () => {
		  try {
			let cids = await fetch('https://api.nft.storage', {
			  headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			  },
			})
			cids = await cids.json()
			const temp = []
			for (let cid of cids.value) {
			  if (cid?.cid) {
				let data = await fetch(
				  `https://ipfs.io/ipfs/${cid.cid}/metadata.json`,
				)
				data = await data.json()
	  
				const getImage = (ipfsURL) => {
				  if (!ipfsURL) return
				  ipfsURL = ipfsURL.split('://')
				  return 'https://ipfs.io/ipfs/' + ipfsURL[1]
				}
	  
				data.image = await getImage(data.image)
				data.cid = cid.cid
				data.created = cid.created
				temp.push(data)
			  }
			}
			setPetsData(temp)
		  } catch (error) {
			console.log(error)
		  }
		}
		loadPets()
	  }, [])
  
	return (
	  <div style={{ minHeight: '10vh', paddingBottom: '3rem' }}>
		 {
    <div style={{ flexGrow: 1, height:500}}>
      <table container spacing={1}>
        {petsData.length ? (
          petsData.map((pet, index) => (
            <table item xs={6} sm={3} key={index}>
              <table style={{ height: '10px', listStyle: 'none' }}>
                <img src={pet.image} alt={pet.name} height={300}/>
                <p
                  title={pet.name}
                  subtitle={<span>by: {pet.description}</span>}
                  actionIcon={
                    <button
                      aria-label={`info about ${pet.name}`}
                      className="icon"
                    >
                      <button
                        variant="contained"
                        size="small"
                        component={Link}
                        to={`/pet-details/${pet.cid}`}
                        className="view-btn"
                      >
                        View
                      </button>
                    </button>
                  }
                />
              </table>
            </table>
          ))
        ) : (
          <h2>No Pets Yet...</h2>
        )}
      </table>
    </div>
}
  
  
	  </div>
	)
  }

export default Home;
