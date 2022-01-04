import styles from '../../styles/Home.module.css';
import Head from "next/head";
import { Props } from "./[client_id]";

export function ClientDetail({ serializedRecord }: Props) {
    return (
        <div className={styles.container}>
            <Head>
                <title>NOMS SPARS Todo</title>
                <meta name="description" content="Generated by create next app" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            {console.log(serializedRecord)}
            <main className={styles.main}>
                <h3>
                    NOMS Details for:
                </h3>
                <h1>
                    {serializedRecord.client_information.client_info.name}
                </h1>
                <h2>
                    {serializedRecord.client_information.interview_type}
                </h2>
                <div className={styles.grid}>


                    <div className={styles.card}>

                        <h3>Client Contact Information:</h3>
                        <p>

                            {serializedRecord.client_information.client_info.address}
                        </p>
                        <p>

                            <hr />
                            {serializedRecord.client_information.client_info.phoneNumber}
                        </p>
                        <hr />
                        <p>

                            {serializedRecord.client_information.client_info.emailAddress ?
                                serializedRecord.client_information.client_info.emailAddress :
                                'N/A'}
                        </p>
                    </div>

                    <div className={styles.card}>

                        <h3>Emergency Contact Information:</h3>
                        <p>
                            {serializedRecord.client_information.emergency_contact.name}

                        </p>
                        <hr />
                        <p>
                            {serializedRecord.client_information.emergency_contact.address}

                        </p>
                        <hr />
                        <p>
                            {serializedRecord.client_information.emergency_contact.emailAddress}

                        </p>
                        <hr />
                        <p>
                            {serializedRecord.client_information.emergency_contact.phoneNumber}
                        </p>
                    </div>

                    <div className={styles.card}>

                        <h3>Demographic Data:</h3>
                        <p>
                            {serializedRecord.demographic.date_of_birth}

                        </p>
                        <hr></hr>
                        <p>
                            {serializedRecord.demographic.gender}

                        </p>
                        <hr></hr>
                        <p>
                            {serializedRecord.demographic.race}

                        </p>
                        <hr></hr>
                        <p>
                            {serializedRecord.demographic.orientation}

                        </p>
                    </div>

                    <div className={styles.card}>

                        <h3>General Functioning Data:</h3>
                        <p>
                            Can deal with daily problems:
                        </p>
                        {serializedRecord.functioning1.can_deal_with_daily_problems}
                        <hr />
                        <p>
                            Satisfied with overall health:
                        </p>
                        {serializedRecord.functioning1.overall_health}
                        <hr />
                        <p>In control of their life life: </p>
                        {serializedRecord.functioning1.control_my_life}
                        <hr />
                        <p>Is satisfied with family relations:</p>
                        {serializedRecord.functioning1.family_relations}
                        <hr />
                        <p>Does well in social situations:</p>
                        {serializedRecord.functioning1.social_situations}
                        <hr />
                        <p>Does well in school and work: </p>
                        {serializedRecord.functioning1.well_in_school_work}
                        <hr />
                        <p>Has decent housing:</p>
                        {serializedRecord.functioning1.good_housing}
                        <hr />
                        <p>Is capable of managing health care needs: </p>
                        {serializedRecord.functioning1.capable_of_managing_health_care_needs}
                        <hr />
                        <p>Can deal with crisis: </p>
                        {serializedRecord.functioning1.deal_with_crisis}
                        <hr />
                        <p>Is bothered by their symptoms:</p>
                        {serializedRecord.functioning1.bothered_by_symptoms}
                        <hr />
                        <p>Felt depressed:</p>
                        {serializedRecord.functioning2.depressed}
                        <hr />
                        <p>Felt everything was an effort:</p>
                        {serializedRecord.functioning2.everything_was_an_effort}
                        <hr />
                        <p>Felt hopeless:</p>
                        {serializedRecord.functioning2.hopeless}
                        <hr />
                        <p>Felt nervous:</p>
                        {serializedRecord.functioning2.nervous}
                        <hr />
                        <p>Felt restless or fidgety:</p>
                        {serializedRecord.functioning2.restless_fidgety}
                        <hr />
                        <p>Felt worthless:</p>
                        {serializedRecord.functioning2.worthless}
                        <hr />

                        <p>Satisfied with ability for daily living:</p>
                        {serializedRecord.functioning3.ability_for_daily_living}
                        <hr />
                        <p>Have enough energy for life:</p>
                        {serializedRecord.functioning3.enough_energy_for_life}
                        <hr />
                        <p>Satisfied with health:</p>
                        {serializedRecord.functioning3.health_satisfaction}
                        <hr />
                        <p>Quality of life rating:</p>
                        {serializedRecord.functioning3.qualityOfLife}
                        <hr />
                        <p>Relationship satisfaction:</p>
                        {serializedRecord.functioning3.relationship_satisfaction}
                        <hr />
                        <p>Personally satisfied: </p>
                        {serializedRecord.functioning3.personal_satisfaction}

                    </div>
                    <div className={styles.card}>

                        <h3>Military Family and Deployment</h3>
                        Active Duty:
                        {serializedRecord.military.activeDuty ? serializedRecord.military.activeDuty : 'N/A'}
                        <hr />
                        Deployed to Combat:
                        {serializedRecord.military.deployed_to_combat ? serializedRecord.military.deployed_to_combat : 'N/A'}
                        <hr />
                        Served in Military:
                        {serializedRecord.military.served_in_military ? serializedRecord.military.served_in_military : 'N/A'}
                        <hr />
                        Family Members served:
                        {serializedRecord.military.family_members_served ? serializedRecord.military.family_members_served : 'N/A'}
                        <hr />
                        Military Branches served:
                        {serializedRecord.military.military_branchs_served ? serializedRecord.military.military_branchs_served : 'N/A'}
                        <hr />
                        Combat Zones served:
                        {serializedRecord.military.combat_zones_served ? serializedRecord.military.combat_zones_served : 'N/A'}

                    </div>
                    <div className={styles.card}>

                        <h3>Violence and Trauma</h3>
                        {serializedRecord.trauma.experienced_trauma ?

                            `Experienced Trauma: ${serializedRecord.trauma.experienced_trauma}                            
                                Physcially Hurt last month: ${serializedRecord.trauma.physically_hurt_in_past_month}
                                Nightmares about it: ${serializedRecord.trauma.nightmares_about_it}
                                Felt Number: ${serializedRecord.trauma.felt_numb_detached}
                                Constantly Onguard: ${serializedRecord.trauma.constantly_onguard}
                                Avoid Reminder Situations: ${serializedRecord.trauma.avoid_reminder_situations}` 
                        :
                            `Experienced Trauma: ${serializedRecord.trauma.experienced_trauma}`
                        }

                    </div>
                    <div className={styles.card}>

                        <h3>Stability in Housing</h3>
                        {serializedRecord.housing_stability.erVists}
                        {serializedRecord.housing_stability.homeless_nights}
                        {serializedRecord.housing_stability.nights_in_detox}
                        {serializedRecord.housing_stability.nights_in_hospital}
                        {serializedRecord.housing_stability.nights_in_prison}
                        {serializedRecord.housing_stability.total_insecure_housing_nights}

                    </div>
                    <div className={styles.card}>

                        <h3>Education and Employment</h3>
                        {serializedRecord.education_employment.currently_employed}
                        {serializedRecord.education_employment.enrolled_in_job_training}
                        {serializedRecord.education_employment.highest_lvl_education}
                        {serializedRecord.education_employment.money_to_meet_needs}
                        {serializedRecord.education_employment.paid_at_min_wage}
                        {serializedRecord.education_employment.paid_direct_wages}
                        {serializedRecord.education_employment.could_anyone_apply}

                    </div>
                    <div className={styles.card}>

                        <h3>Crime and Criminal Justice Status</h3>
                        {serializedRecord.crime.arrest_count}

                    </div>
                    <div className={styles.card}>

                        <h3>Social Connectedness</h3>
                        {serializedRecord.social_connectedness.supportive_family_friends}
                        {serializedRecord.social_connectedness.have_support_in_a_crisis}
                        {serializedRecord.social_connectedness.have_people_to_enjoy_things_with}
                        {serializedRecord.social_connectedness.happy_with_friendships}
                        {serializedRecord.social_connectedness.generally_accomplish_goals}
                        {serializedRecord.social_connectedness.belong_in_community}

                    </div>
                </div>
                <h3>For BMI Stats, Services Received, and Admit Date, Check Dr. Cloud</h3>
            </main>
        </div>
    );
}
