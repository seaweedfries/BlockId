import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, GridItem, Stack, Text, Image, Box, Button } from '@chakra-ui/react'

function Home(props) {
	const [petsData, setPetsData] = useState([])
  
	useEffect(() => { //find corresponding ids in approvedlist, get cid from it -> pull from nft.storage
		const loadPets = async () => {
		  try {
			const temp = []
			console.log(props.nftList)
			for (let id in props.approvedList[props.account]) {
			  if (id ? true : false) {
				let data = await fetch(
				  `https://ipfs.io/ipfs/${props.nftList[id][0]}/metadata.json`,
				)
				data = await data.json()
	  
				const getImage = (ipfsURL) => {
				  if (!ipfsURL) return
				  ipfsURL = ipfsURL.split('://')
				  return 'https://ipfs.io/ipfs/' + ipfsURL[1]
				}
	  
				data.image = await getImage(data.image)
				data.cid = props.nftList[id][0]
				data.txHash = props.nftList[id][1]
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

	let navigate = useNavigate(); 
  	const routeChange = (cid, txHash) =>{ 
		let path = `/nft-details/${cid}/${txHash}`; 
		navigate(path);
  	}
  
	return ( //Image, Title, tokenid
		<Grid templateColumns='repeat(4, 1fr)' gap={1}>
			{petsData.length ? (
							petsData.map((pet, index) => (
								<GridItem>
									<Box display='flex' justifyContent="center" bg='blue.100' boxSize={350} borderRadius='lg' padding={3} margin={3}>
									<Stack direction={'column'}>
										<Image src={pet.image} alt={''} height="200px"/>
										<Text alignSelf={'center'}>{pet.name}</Text>
										<Text alignSelf={'center'}>{pet.description}</Text>
										<Button component={Link} onClick={() => routeChange(pet.cid, pet.txHash)}>View</Button>
									</Stack>
									</Box>
								</GridItem>
							))
						) : (
							<GridItem>No Approved NFTs Yet...</GridItem>
						)}	
		</Grid>
	)
}

export default Home;
