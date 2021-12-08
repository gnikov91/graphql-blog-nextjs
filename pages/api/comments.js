/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI =
	'https://api-eu-central-1.graphcms.com/v2/ckw3b7z9u64w701z44kbbfqep/master'
const graphcmsToken =
	'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzczMTU2OTMsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrdzNiN3o5dTY0dzcwMXo0NGtiYmZxZXAvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNWYxZDU2NzYtNGIzYy00NThjLWFkYjgtOTc4YTRlMGQ4NTAzIiwianRpIjoiY2t3NjdobWV2MHZleDAxeHE4eDVkaHNndiJ9.EMfMizMRIPIH47Vkb5W7tHFUw5b8YmFjnkmJvexTTHp-cgeGVxX6jtbBLmgJvPXr9jeIDsOuKeRVfvZNKoF_tg6PUrcOKotyS_Rayj589743Jbzu0L0UpEte7DmnUxsXXTRi__fhe749g__Tb12VB2B9nANc6Xapgb29Tuvc6gwRS8389vdQDqol3gX7lmaKrFWnAhXOklNoospWrjnMV5tGqUlGlNzrQy9mWO2gNGlG97le9kh3xc-dkUWg56fcYSqSNaO2Aobh-10OUL5VEaP641DaWcwNd7-TD60LhFI9iz0QAOyBg4ENXnONQa4EIxVFVA-IOyzY1uQ77U934lHA9FXImaFlcES28OYrVfnw0u3i-Uc_C2Sf31nEsrOml-tSZ5Zk_EMOccKMlNJMjGZ4-aJ0zvrau3v1Yn9LBGmGMfXB5Y6PKEE5G4wgLqPBPj1Iz7UKgJ3g0iPUDdcfzYabwcctYhfZnNcddOj2OyKtaBMpyPeesVh9IVja8Ux5yQO4N2dbD4gcVF238ke3Jq_C-2BhnnOfCEpXrkaDLsJ0WQ4g_u7hvxYt4ucMMymQCqg-WsaeOE2uD92d-S6p0B0WgB90VFohgyl5j97ZrH4eZtZ1xpsmLLoNQzh4nfeiqRdhxdBuDSmUmZJk_39VypbQYUhMKpFn-mVY5PjO-uI'

export default async function comments(req, res) {
	const graphQLClient = new GraphQLClient(graphqlAPI, {
		headers: {
			authorization: `Bearer ${graphcmsToken}`,
		},
	})

	const query = gql`
		mutation CreateComment(
			$name: String!
			$email: String!
			$comment: String!
			$slug: String!
		) {
			createComment(
				data: {
					name: $name
					email: $email
					comment: $comment
					post: { connect: { slug: $slug } }
				}
			) {
				id
			}
		}
	`

	try {
		const result = await graphQLClient.request(query, req.body)

		return res.status(200).send(result)
	} catch (error) {
		console.log(error)
	}
}
