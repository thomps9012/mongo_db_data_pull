export const clientRecordInterface = {
    _id: String || null,
    client_information: {
        interviewDate: String || null,
        interview_type: String || null,
        client_info: {
            name: String || null,
            emailAddress: String || null,
            phoneNumber: String || null,
            address: String || null
        },
        emergency_contact: {
            name: String || null,
            emailAddress: String || null,
            phoneNumber: String || null,
            address: String || null
        }
    },
    crime: {
        arrest_count: String || null
    },
    demographic: {
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
        other_drug_name: String || null,
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
        qualityOfLife: String || null,
        ability_for_daily_living: String || null,
        health_satisfaction: String || null,
        personal_satisfaction: String || null,
        relationship_satisfaction: String || null
    },
    housing_stability: {
        homeless_nights: String || null,
        nights_in_hospital: String || null,
        nights_in_detox: String || null,
        nights_in_prison: String || null,
        total_insecure_housing_nights: String || null,
        erVists: String || null
    },
    military: {
        served_in_military: String || null,
        military_branchs_served: Array,
        activeDuty: String || null,
        current_branch_served: Array,
        deployed_to_combat: String || null,
        combat_zones_served: Array,
        family_members_served: String || null
    },
    social_connectedness: {
        happy_with_friendships: String || null,
        have_people_to_enjoy_things_with: String || null,
        belong_in_community: String || null,
        have_support_in_a_crisis: String || null,
        supportive_family_friends: String || null,
        generally_accomplish_goals: String || null
    },
    trauma: {
        experienced_trauma: String || null,
        nightmares_about_it: String || null,
        avoid_reminder_situations: String || null,
        constantly_onguard: String || null,
        felt_numb_detached: String || null,
        physically_hurt_in_past_month: String || null
    }
}

export const clientCardInterface = {
    _id: String || null,
    client_information: {
        interviewDate: String || null,
        interview_type: String || null,
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