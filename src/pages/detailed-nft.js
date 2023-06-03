import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { 
	Box,
	Text,
	Divider,
	Stack,
	Image,
	Button,
	Input,
  Icon,
 } from '@chakra-ui/react';
 import { MdShare } from "react-icons/md";


function PetDetails(props) {
    const [petData, setPetData] = useState({})
    const { nftId, nfttxhsh } = useParams();

		useEffect(() => {
      const loadPets = async () => {
        console.log(nftId)
        try {
          let data = await fetch(`https://ipfs.io/ipfs/${nftId}/metadata.json`)
          data = await data.json()      
          const getImage = (ipfsURL) => {
            if (!ipfsURL) return
            ipfsURL = ipfsURL.split('://')
            return 'https://ipfs.io/ipfs/' + ipfsURL[1]
          }
          data.image = await getImage(data.image)
          data.cid = nftId
          if (nfttxhsh) {
            data.txHash = nfttxhsh;
          } else {
            data.txHash = props.nftList.find(element => element[0] == nftId)[1]
          }
          setPetData(data)
          } catch (error) {
            console.log(error)
          }
      }
      loadPets()}, []);
    
    function copyLink() {
      console.log(petData.cid);
      navigator.clipboard.writeText(`http://localhost:3000/nft-details/${petData.cid}/${petData.txHash}`); //address CHANGE THIS IF NOT ON LOCAL HOST
    }

  return (
  <Box display='flex' justifyContent="center" margin='8' borderRadius='lg' h="550px">
      {petData ? (<Image src={petData.image} alt={''} height='500px'/>) : (<h3>Loading...</h3>)}
      <Box w='10px'/>
			<Box bg='blue.100' w='600px' h='500px' borderRadius='lg'>
				<Stack padding='10' direction='column' id='rightbox'>
					<Text as='b'>Title: </Text>
          <Box bg='white' borderRadius='lg' padding='10px'>
            <Text>{petData.name}</Text>
          </Box>
					<Text as='b'>Description: </Text>
					<Box bg='white' borderRadius='lg' padding='10px'>
            <Text>{petData.description}</Text>
          </Box>
          <Text as='b'>Transaction Hash: </Text>
					<Box bg='white' borderRadius='lg' padding='10px'>
            <Text>{petData.txHash}</Text>
          </Box>
          <Text as='b'>Owner: </Text>
					<Box bg='white' borderRadius='lg' padding='10px'>
            <Text>{petData.owner}</Text>
          </Box>
					<Box h={5}/>
					<Button flex='1' height='100px' leftIcon={<MdShare />} padding='10px' onClick={copyLink}>Share</Button>
				</Stack>
			</Box>
		</Box>
  )
}

export default PetDetails
