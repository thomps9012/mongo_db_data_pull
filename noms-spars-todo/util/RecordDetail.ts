export type clientRecordDetail = {
    _id: String;
    interview_info: {
        interviewDate: String;
        interview_type: String;
    },
    client_information: {
        client_info: {
            client_first_name: String;
            client_last_name: String;
            client_email_address: String;
            client_phone_number: String;
            client_street: String;
            client_city: String;
            client_state: String;
            client_zip: String;
        },
        emergency_contact: {
            contact_first_name: String;
            contact_last_name: String;
            contact_email_address: String;
            contact_phone_number: String;
            contact_street: String;
            contact_city: String;
            contact_state: String;
            contact_zip: String;
        }
    },
    crime_data: {
        arrest_count: String;
    },
    demographic_data: {
        gender: String;
        race: String;
        date_of_birth: String;
        orientation: String;
    },
    drug_use: {
        tobacco_use: String;
        alcoholic_beverages: String;
        gt_five_drinks: String;
        gt_four_drinks: String;
        cannabis_use: String;
        cocaine_use: String;
        prescription_stimulant_use: String;
        prescription_opioid_use: String;
        methamphetamine_use: String;
        inhalant_use: String;
        sedative_use: String;
        hallucinogen_use: String;
        street_opioids_use: String;
        other_drug: String;
        other_drug_use: String;
    },
    education_employment: {
        highest_lvl_education: String;
        enrolled_in_job_training: String;
        currently_employed: String;
        money_to_meet_needs: String;
        paid_at_min_wage: String;
        paid_direct_wages: String;
        could_anyone_apply: String;
    },
    family_living_conditions: {
        housing: String;
        space_satisfaction: String;
        pregnant: String;
    },
    functioning1: {
        overall_health: String;
        capable_of_managing_health_care_needs: String;
        can_deal_with_daily_problems: String;
        control_my_life: String;
        deal_with_crisis: String;
        family_relations: String;
        social_situations: String;
        well_in_school_work: String;
        good_housing: String;
        bothered_by_symptoms: String;
    },
    functioning2: {
        nervous: String;
        hopeless: String;
        restless_fidgety: String;
        depressed: String;
        everything_was_an_effort: String;
        worthless: String;
        bothered_by_symptoms: String;
    },
    functioning3: {
        enough_energy_for_life: String;
        quality_of_life: String;
        ability_for_daily_living: String;
        health_satisfaction: String;
        personal_satisfaction: String;
        relationship_satisfaction: String;
    },
    housing_stability: {
        homeless_nights: Number;
        nights_in_hospital: Number;
        nights_in_detox: Number;
        nights_in_prison: String;
        total_insecure_housing_nights: Number;
        ER_Visits: Number;
    },
    military_data: {
        served_in_military: Boolean;
        branches_served: Array<String>;
        active_duty: Boolean;
        current_branch: String;
        deployed_to_combat: Boolean;
        combat_zones_served: Array<String>;
        family_members_served: Boolean;
    },
    social_connectedness: {
        happy_with_friendships: String;
        have_people_to_enjoy_things_with: String;
        belong_in_community: String;
        have_support_in_a_crisis: String;
        supportive_family_friends: String;
        generally_accomplish_goals: String;
    },
    trauma_data: {
        experienced_trauma: Boolean;
        nightmares: Boolean;
        avoid_reminder_situations: Boolean;
        constantly_onguard: Boolean;
        felt_numb_detached: Boolean;
        physically_hurt_in_past_month: String;
    }
}