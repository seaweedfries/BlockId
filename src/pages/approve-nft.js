import { useEffect, useState } from 'react';

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1ZGJEMzM4N2U3ZDJhNTRCODQwYkFjOUVmZGIwOTJkNGRGMTVGZDMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTI4NjczOTA1MCwibmFtZSI6IkJsb2NrSUQifQ.PetsVefIO9rpoSHXg6EYwzLdgexFGEmh02yH0ORMLVQ';

function ApproveNFT(props) {
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
	  }, []);

      const approveRequest = async (event) => {
        console.log(props.unapprovedList)
        // setArtists(
            //     artists.filter(a =>
            //       a.id !== artist.id
            //     )
        if (event) {
            const address = props.account;
            const tokenid = 1;
            const url = "https://ipfs.io/ipfs/bafyreihgpsff6fsn7eg3rpv6y4z4xyonazqmdmudrb4b26u4k7t65p746e/metadata.json";
            // "ipfs://bafyreihgpsff6fsn7eg3rpv6y4z4xyonazqmdmudrb4b26u4k7t65p746e/metadata.json"
            const gas = await props.contract.methods.mint(address, tokenid, url).estimateGas();
            await props.contract.methods.mint(address, tokenid, url).send({
                from: props.account,
                gas,
            });
            //add to approved list
        }
        else {
            console.log("Request Rejected")
        }
    }
          
	return (
	<div style={{ minHeight: '10vh', paddingBottom: '3rem' }}>
		<div style={{ flexGrow: 1, height:500}}>
			<table>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Address</th>
                </tr>
				{petsData.length ? (
					petsData.map((pet, index) => (
						<tr key={index}>
							<td>{
								<img src={pet.image} alt={''} height={200}/>
								}</td>
                            <td>{pet.name}</td>
							<td>{pet.description}</td>
                            <td>{pet.owner}</td>
                            <td><button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={() => approveRequest(true)} //true with nft details to find from unapprovedlist
                                >
                                Approve
                                </button>
                            </td>
                            <td><button
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={() => approveRequest(false)}
                                >
                                Reject
                                </button>
                            </td>
						</tr>
					))
				) : (
					<h3>No NFTs Requests Yet...</h3>
				)}
			</table>
		</div>
	</div>
	)
}

export default ApproveNFT;