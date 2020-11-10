import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const PoliciesScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.view}>
					<Text style={styles.heading}>
						Welcome to StarZHubs
					</Text>
					<Text style={styles.content}>
						By accessing this website, we
						assume you accept these terms of
						service in full. Do not continue
						to use StarZHubs’ website if you
						do not accept all of the terms
						of service stated on this page.
					</Text>
					<Text style={styles.content}>
						The following terminology
						applies to these Terms of
						Service, Privacy Statement and
						Disclaimer Notice and any or all
						Agreements: "Client", "You" and
						"Your" refers to you, the person
						accessing this website and
						accepting the Company's terms of
						service. "The Company",
						"Ourselves", "We", "Our" and
						"Us", refers to our Company.
						"Party", "Parties", or "Us",
						refers to both the Client and
						ourselves, or either the Client
						or ourselves. All terms refer to
						the offer, acceptance and
						consideration of payment
						necessary to undertake the
						process of our assistance to the
						Client in the most appropriate
						manner, whether by formal
						meetings of a fixed duration, or
						any other means, for the express
						purpose of meeting the Client's
						needs in respect of provision of
						the Company's stated
						services/products, in accordance
						with and subject to, prevailing
						law of. Any use of the above
						terminology or other words in
						the singular, plural,
						capitalisation and/or he/she or
						they, are taken as
						interchangeable and therefore as
						referring to same.
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						Cookies
					</Text>
					<Text style={styles.content}>
						We employ the use of cookies. By
						using StarZHubs’ website you
						consent to the use of cookies in
						accordance with StarZHubs’
						privacy policy.
					</Text>
					<Text style={styles.content}>
						Most of the modern day
						interactive web sites use
						cookies to enable us to retrieve
						user details for each visit.
						Cookies are used in some areas
						of our site to enable the
						functionality of this area and
						ease of use for those people
						visiting. Some of our affiliate
						/ advertising partners may also
						use cookies.
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						License
					</Text>
					<Text style={styles.content}>
						Unless otherwise stated,
						StarZHubs and/or it's licensors
						own the intellectual property
						rights for all material on
						StarZHubs. All intellectual
						property rights are reserved.
						You may view and/or print pages
						from www.StarZHubs.com for your
						own personal use subject to
						restrictions set in these terms
						of service.
					</Text>
					<Text style={styles.content}>
						You must not:
					</Text>
					<Text style={styles.subcontent}>
						1.Republish material from
						www.StarZHubs.com
					</Text>
					<Text style={styles.subcontent}>
						2. Sell, rent or sub-license
						material from www.StarZHubs.com
					</Text>
					<Text style={styles.subcontent}>
						3. Reproduce, duplicate or copy
						material from www.StarZHubs.com
					</Text>
					<Text style={styles.content}>
						Redistribute content from
						StarZHubs (unless content is
						specifically made for
						redistribution).
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						User Comments
					</Text>
					<Text style={styles.content}>
						1. This Agreement shall begin on
						the date hereof.
					</Text>
					<Text style={styles.content}>
						2. Certain parts of this website
						offer the opportunity for users
						to post and exchange opinions,
						information, material and data
						('Comments') in areas of the
						website. StarZHubs does not
						screen, edit, publish or review
						Comments prior to their
						appearance on the website and
						Comments do not reflect the
						views or opinions of StarZHubs,
						its agents or affiliates.
						Comments reflect the view and
						opinion of the person who posts
						such view or opinion. To the
						extent permitted by applicable
						laws StarZHubs shall not be
						responsible or liable for the
						Comments or for any loss cost,
						liability, damages or expenses
						caused and or suffered as a
						result of any use of and/or
						posting of and/or appearance of
						the Comments on this website.
					</Text>
					<Text style={styles.content}>
						3. StarZHubs reserves the right
						to monitor all Comments and to
						remove any Comments which it
						considers in its absolute
						discretion to be inappropriate,
						offensive or otherwise in breach
						of these Terms of Service.
					</Text>
					<Text style={styles.content}>
						4. You warrant and represent
						that:
					</Text>
					<Text style={styles.subcontent}>
						1. You are entitled to post the
						Comments on our website and have
						all necessary licenses and
						consents to do so;
					</Text>
					<Text style={styles.subcontent}>
						2. The Comments do not infringe
						any intellectual property right,
						including without limitation
						copyright, patent or trademark,
						or other proprietary right of
						any third party;
					</Text>
					<Text style={styles.subcontent}>
						3. The Comments do not contain
						any defamatory, libellous,
						offensive, indecent or otherwise
						unlawful material or material
						which is an invasion of privacy
					</Text>
					<Text style={styles.subcontent}>
						4. The Comments will not be used
						to solicit or promote business
						or custom or present commercial
						activities or unlawful activity.
					</Text>
					<Text style={styles.content}>
						5. You hereby grant to StarZHubs
						a non-exclusive royalty-free
						license to use, reproduce, edit
						and authorize others to use,
						reproduce and edit any of your
						Comments in any and all forms,
						formats or media.
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						Hyperlinking to our Content
					</Text>
					<Text style={styles.content}>
						1. The following organizations
						may link to our Web site without
						prior written approval:
					</Text>
					<Text style={styles.subcontent}>
						1. Government agencies;
					</Text>
					<Text style={styles.subcontent}>
						2. Search engines;
					</Text>
					<Text style={styles.subcontent}>
						3. News organizations;
					</Text>
					<Text style={styles.subcontent}>
						4. Online directory distributors
						when they list us in the
						directory may link to our Web
						site in the same manner as they
						hyperlink to the Web sites of
						other listed businesses; and
					</Text>
					<Text style={styles.subcontent}>
						5. Systemwide Accredited
						Businesses except soliciting
						non-profit organizations,
						charity shopping malls, and
						charity fundraising groups which
						may not hyperlink to our Web
						site.
					</Text>
					<Text style={styles.content}>
						2. These organizations may link
						to our home page, to
						publications or to other Web
						site information so long as the
						link: (a) is not in any way
						misleading; (b) does not falsely
						imply sponsorship, endorsement
						or approval of the linking party
						and its products or services;
						and (c) fits within the context
						of the linking party's site.
					</Text>
					<Text style={styles.content}>
						3. We may consider and approve
						in our sole discretion other
						link requests from the following
						types of organizations:
					</Text>
					<Text style={styles.subcontent}>
						1. commonly-known consumer
						and/or business information
						sources such as Chambers of
						Commerce, American Automobile
						Association, AARP and Consumers
						Union;
					</Text>
					<Text style={styles.subcontent}>
						2. dot.com community sites;
					</Text>
					<Text style={styles.subcontent}>
						3. associations or other groups
						representing charities,
						including charity giving sites,
					</Text>
					<Text style={styles.subcontent}>
						4. online directory
						distributors;
					</Text>
					<Text style={styles.subcontent}>
						5. internet portals;
					</Text>
					<Text style={styles.subcontent}>
						6. accounting, law and
						consulting firms whose primary
						clients are businesses; and
					</Text>
					<Text style={styles.subcontent}>
						7. educational institutions and
						trade associations.
					</Text>
					<Text style={styles.content}>
						We will approve link requests
						from these organizations if we
						determine that: (a) the link
						would not reflect unfavorably on
						us or our accredited businesses
						(for example, trade associations
						or other organizations
						representing inherently suspect
						types of business, such as
						work-at-home opportunities,
						shall not be allowed to link);
						(b)the organization does not
						have an unsatisfactory record
						with us; (c) the benefit to us
						from the visibility associated
						with the hyperlink outweighs the
						absence of StarZHubs; and (d)
						where the link is in the context
						of general resource information
						or is otherwise consistent with
						editorial content in a
						newsletter or similar product
						furthering the mission of the
						organization.
					</Text>
					<Text style={styles.content}>
						These organizations may link to
						our home page, to publications
						or to other Web site information
						so long as the link: (a) is not
						in any way misleading; (b) does
						not falsely imply sponsorship,
						endorsement or approval of the
						linking party and it products or
						services; and (c) fits within
						the context of the linking
						party's site.
					</Text>
					<Text style={styles.content}>
						If you are among the
						organizations listed in
						paragraph 2 above and are
						interested in linking to our
						website, you must notify us by
						sending an e-mail to
						jerin@promasoft.net. Please
						include your name, your
						organization name, contact
						information (such as a phone
						number and/or e-mail address) as
						well as the URL of your site, a
						list of any URLs from which you
						intend to link to our Web site,
						and a list of the URL(s) on our
						site to which you would like to
						link. Allow 2-3 weeks for a
						response.
					</Text>
					<Text style={styles.content}>
						Approved organizations may
						hyperlink to our Web site as
						follows:
					</Text>
					<Text style={styles.subcontent}>
						1. By use of our corporate name;
						or
					</Text>
					<Text style={styles.subcontent}>
						2. By use of the uniform
						resource locator (Web address)
						being linked to; or
					</Text>
					<Text style={styles.subcontent}>
						3. By use of any other
						description of our Web site or
						material being linked to that
						makes sense within the context
						and format of content on the
						linking party's site.
					</Text>
					<Text style={styles.content}>
						No use of StarZHubs’ logo or
						other artwork will be allowed
						for linking absent a trademark
						license agreement.
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						Iframes
					</Text>
					<Text style={styles.content}>
						Without prior approval and
						express written permission, you
						may not create frames around our
						Web pages or use other
						techniques that alter in any way
						the visual presentation or
						appearance of our Web site.
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						Content Liability
					</Text>
					<Text style={styles.content}>
						We shall have no responsibility
						or liability for any content
						appearing on your Web site. You
						agree to indemnify and defend us
						against all claims arising out
						of or based upon your Website.
						No link(s) may appear on any
						page on your Web site or within
						any context containing content
						or materials that may be
						interpreted as libellous,
						obscene or criminal, or which
						infringes, otherwise violates,
						or advocates the infringement or
						other violation of, any third
						party rights.
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						Reservation of Rights
					</Text>
					<Text style={styles.content}>
						We reserve the right at any time
						and in its sole discretion to
						request that you remove all
						links or any particular link to
						our Web site. You agree to
						immediately remove all links to
						our Web site upon such request.
						We also reserve the right to
						amend these terms of service and
						its linking policy at any time.
						By continuing to link to our Web
						site, you agree to be bound to
						and abide by these linking terms
						of service.
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						Removal of links from our
						website
					</Text>
					<Text style={styles.content}>
						If you find any link on our Web
						site or any linked web site
						objectionable for any reason,
						you may contact us about this.
						We will consider requests to
						remove links but will have no
						obligation to do so or to
						respond directly to you. Whilst
						we endeavour to ensure that the
						information on this website is
						correct, we do not warrant its
						completeness or accuracy; nor do
						we commit to ensuring that the
						website remains available or
						that the material on the website
						is kept up to date.
					</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.heading}>
						Disclaimer
					</Text>
					<Text style={styles.content}>
						To the maximum extent permitted
						by applicable law, we exclude
						all representations, warranties
						and conditions relating to our
						website and the use of this
						website (including, without
						limitation, any warranties
						implied by law in respect of
						satisfactory quality, fitness
						for purpose and/or the use of
						reasonable care and skill).
						Nothing in this disclaimer will:
					</Text>
					<Text style={styles.subcontent}>
						1. limit or exclude our or your
						liability for death or personal
						injury resulting from
						negligence;
					</Text>
					<Text style={styles.subcontent}>
						2. limit or exclude our or your
						liability for fraud or
						fraudulent misrepresentation;
					</Text>
					<Text style={styles.subcontent}>
						3. limit any of our or your
						liabilities in any way that is
						not permitted under applicable
						law; or
					</Text>
					<Text style={styles.subcontent}>
						4. exclude any of our or your
						liabilities that may not be
						excluded under applicable law.
					</Text>
					<Text style={styles.content}>
						The limitations and exclusions
						of liability set out in this
						Section and elsewhere in this
						disclaimer: (a) are subject to
						the preceding paragraph; and (b)
						govern all liabilities arising
						under the disclaimer or in
						relation to the subject matter
						of this disclaimer, including
						liabilities arising in contract,
						in tort (including negligence)
						and for breach of statutory
						duty.
					</Text>
				</View>
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
	},
	view: {
		width: '100%',
		paddingHorizontal: '5%',
		textAlign: 'justify',
		marginTop: 15,
	},
	heading: {
		fontSize: 15,
		color: 'black',
		fontWeight: 'bold',
		marginBottom: '2%',
	},
	content: {
		marginBottom: '2%',
		textAlign: 'justify',
		color: 'gray',
		fontSize: 12,
		lineHeight: 18,
	},
	subcontent: {
		marginBottom: '2%',
		textAlign: 'justify',
		marginLeft: '8%',
		color: 'gray',
		fontSize: 12,
	},
});
export default PoliciesScreen;
