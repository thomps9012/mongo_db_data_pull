export const clientRecordInterface = {
    _id: String || null,
    interview_info: {
        interviewDate: String || null,
        interview_type: String || null,
    },
    client_information: {
        client_info: {
            client_first_name: String || null,
            client_last_name: String || null,
            client_email_address: String || null,
            client_phone_number: String || null,
            client_street: String || null,
            client_city: String || null,
            client_state: String || null,
            client_zip: String || null
        },
        emergency_contact: {
            contact_first_name: String || null,
            contact_last_name: String || null,
            contact_email_address: String || null,
            contact_phone_number: String || null,
            contact_street: String || null,
            contact_city: String || null,
            contact_state: String || null,
            contact_zip: String || null
        }
    },
    crime_data: {
        arrest_count: String || null
    },
    demographic_data: {
        gender: String || null,
        race: String || null,
        date_of_birth: String || null,
        orientation: String || null
    },
    drug_use: {
        tobacco_use: String || null,
        alcoholic_beverages: String || null,
        gt_five_drinks: String || null,
        gt_four_drinks: String || null,
        cannabis_use: String || null,
        cocaine_use: String || null,
        prescription_stimulant_use: String || null,
        prescription_opioid_use: String || null,
        methamphetamine_use: String || null,
        inhalant_use: String || null,
        sedative_use: String || null,
        hallucinogen_use: String || null,
        street_opioids_use: String || null,
        other_drug: String || null,
        other_drug_use: String || null
    },
    education_employment: {
        highest_lvl_education: String || null,
        enrolled_in_job_training: String || null,
        currently_employed: String || null,
        money_to_meet_needs: String || null,
        paid_at_min_wage: String || null,
        paid_direct_wages: String || null,
        could_anyone_apply: String || null
    },
    family_living_conditions: {
        housing: String || null,
        space_satisfaction: String || null,
        pregnant: String || null
    },
    functioning1: {
        overall_health: String || null,
        capable_of_managing_health_care_needs: String || null,
        can_deal_with_daily_problems: String || null,
        control_my_life: String || null,
        deal_with_crisis: String || null,
        family_relations: String || null,
        social_situations: String || null,
        well_in_school_work: String || null,
        good_housing: String || null,
        bothered_by_symptoms: String || null
    },
    functioning2: {
        nervous: String || null,
        hopeless: String || null,
        restless_fidgety: String || null,
        depressed: String || null,
        everything_was_an_effort: String || null,
        worthless: String || null,
        bothered_by_symptoms: String || null
    },
    functioning3: {
        enough_energy_for_life: String || null,
        quality_of_life: String || null,
        ability_for_daily_living: String || null,
        health_satisfaction: String || null,
        personal_satisfaction: String || null,
        relationship_satisfaction: String || null
    },
    housing_stability: {
        homeless_nights: Number || null,
        nights_in_hospital: Number || null,
        nights_in_detox: Number || null,
        nights_in_prison: String || null,
        total_insecure_housing_nights: Number || null,
        ER_Visits: Number || null
    },
    military_data: {
        served_in_military: Boolean || String || null,
        branches_served: Array,
        active_duty: Boolean || String || null,
        current_branch: String || null,
        deployed_to_combat: Boolean || String || null,
        combat_zones_served: Array,
        family_members_served: Boolean || String || null
    },
    social_connectedness: {
        happy_with_friendships: String || null,
        have_people_to_enjoy_things_with: String || null,
        belong_in_community: String || null,
        have_support_in_a_crisis: String || null,
        supportive_family_friends: String || null,
        generally_accomplish_goals: String || null
    },
    trauma_data: {
        experienced_trauma: Boolean || String || null,
        nightmares: Boolean || String || null,
        avoid_reminder_situations: Boolean || String || null,
        constantly_onguard: Boolean || String || null,
        felt_numb_detached: Boolean || String || null,
        physically_hurt_in_past_month: String || null
    }
}

export const clientCardInterface = {
    _id: String || null,
    interview_info: {
        interviewDate: String || null,
        interview_type: String || null,
    },
    client_information: {
        client_info: {
            name: String || null,
            emailAddress: String || null,
            phoneNumber: String || null,
            address: String || null
        }
    },
    NORA_acknowledged: Boolean || null,
    client_acknowledged: Boolean || null,
    gift_card_received: Boolean || null
}