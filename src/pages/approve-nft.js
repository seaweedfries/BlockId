import { useEffect, useState } from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Button
  } from '@chakra-ui/react'

function ApproveNFT(props) {
    const [petsData, setPetsData] = useState([])
  
	useEffect(() => {
		const loadPets = async () => {
		  try {
			const temp = []
			for (let cid of props.unapprovedList) {
			  if (cid?.url) {
				let data = await fetch(
				  `https://ipfs.io/ipfs/${cid.url}/metadata.json`,
				)
				data = await data.json()
	  
				const getImage = (ipfsURL) => {
				  if (!ipfsURL) return
				  ipfsURL = ipfsURL.split('://')
				  return 'https://ipfs.io/ipfs/' + ipfsURL[1]
				}
	  
				data.image = await getImage(data.image)
				data.cid = cid.url
				data.created = cid.time
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

      const approveRequest = async (event, pet) => {
        if (event == true) {
            const address = pet.owner;
            props.setTokenId(props.tokenid + 1);
			var txHash = '';
            const url = `https://ipfs.io/ipfs/${pet.cid}/metadata.json`;
            const gas = await props.contract.methods.mint(address, props.tokenid, url).estimateGas();
            const data = await props.contract.methods.mint(address, props.tokenid, url).send({
                from: props.account,
                gas,
            })
			.then(function(tx) {
				txHash = tx.transactionHash;
			})
			.catch(function(e) {console.log(e)});

			props.updateAList(address, props.tokenid, pet.cid, txHash);
			
        }
        else {
            console.log("Request Rejected")
        }
		props.setUnapprovedList(props.unapprovedList.filter(request => request['url'] !== pet.cid));
    }
          
	return (
		<TableContainer>
			<Table variant='striped'>
				<Thead>
				<Tr>
					<Th>Image</Th>
					<Th>Title</Th>
					<Th>Description</Th>
					<Th>Owner's Address</Th>
					<Th></Th>
				</Tr>
				</Thead>
				<Tbody>
					{petsData.length ? (petsData.map((pet, index) => (
						<Tr key={index}>
							<Td>{
								<img src={pet.image} alt={''} width="200px"/>
								}</Td>
                            <Td>{pet.name}</Td>
							<Td>{pet.description}</Td>
                            <Td>{pet.owner}</Td>
                            <Td><Button
                                onClick={() => approveRequest(true, pet)}
                                >
                                Approve
                                </Button>
								<Button
                                onClick={() => approveRequest(false, pet)}
                                >
                                Reject
                                </Button>
                            </Td>
						</Tr>
					))
				) : (
					<Tr>No NFTs Requests Yet...</Tr>
				)}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default ApproveNFT;