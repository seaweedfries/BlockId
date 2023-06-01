import { useEffect, useState } from 'react';

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
		<div style={{ flexGrow: 1, height:500}}>
			<table>
				{petsData.length ? (
					petsData.map((pet, index) => (
						// if (pet.owner == props.account) {} //give list of approved nfts per account address.
						<tr key={index}>
							<td>{
								<img src={pet.image} alt={''} height={200}/>
								}</td>
                            <td>{pet.name}</td>
							<td>{pet.description}</td>
						</tr>
					))
				) : (
					<h3>No NFTs Yet...</h3>
				)}
			</table>
		</div>
	</div>
	)
}

export default Home;
