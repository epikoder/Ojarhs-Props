import React from "react"
import Layout from "../../components/Layout"

const Page = () => {
    return <Layout>
        <div className="p-4 lg:p-8 text-gray-600 font-light">
            <div className="text-lg p-1 m-1 font-semibold">
                ABOUT US
            </div>
            <div className="p-1">
                {`Ojarh Plaza is now open for you to rent and sell to your customers.
					Our location remains the best and surely very accessible. Our
					processes are automated for credibility and satisfaction`}
            </div>
            <div className="text-lg p-1 m-1 font-semibold">
                COMMITMENT TO QUALITY
            </div>
            <div className="p-1">
                {`We take pride in our work, performing to the highest possible standard team work: over values are not
                achieved on our own. We understand the importance of working with all our partners, whether
                employees, tenants, suppliers, contractor customers we establish good working relationships and values
                the input of all stakeholders in any aspect of our business.
                Reliability: we understand and appreciate the importance of our clients' time. As such we keep our
                promises in terms of our service. Commitments, timings. And objectives and communicate progress at
                every step of the way to keep our clients informed.`}
            </div>
            <div className="text-lg p-1 m-1 font-semibold">
                OUR MISSION
            </div>
            <div className="p-1">
                {`Ojarh global properties are specialist in residential, commercial and block management as well as many
                aspect of residential and commercial property maintenance. We focus on managing, protecting and
                maximizing the potential of property assets. We bring property and infrastructure management into the
                21st century by aligning the interest of the tenant and clients through service and asset protection as
                well as ensuring the maximization of the asset value.`}
            </div>
            <div className="text-lg p-1 m-1 font-semibold">
                OUR VISION
            </div>
            <div className="p-1">
                {`our vision is to be premier organization for the delivery of all aspects of property and asset management
                across Nigeria.
                Helping developers, investors, housing associations and local authorities to create aspirational and
                sustainable development and communities, working in partnership with all stakeholders including
                tenants and residents.`}
            </div>
        </div>
    </Layout>
}
export default Page