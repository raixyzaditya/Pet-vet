const symptoms = [
    'anorexia', 'abdominal_pain', 'anaemia', 'abortions', 'acetone',
    'aggression', 'arthrogyposis', 'ankylosis', 'anxiety', 'bellowing',
    'blood_loss', 'blood_poisoning', 'blisters', 'colic',
    'Condemnation_of_livers', 'conjunctivae', 'coughing', 'depression',
    'discomfort', 'dyspnea', 'dysentery', 'diarrhoea', 'dehydration',
    'drooling', 'dull', 'decreased_fertility', 'diffculty_breath',
    'emaciation', 'encephalitis', 'fever', 'facial_paralysis',
    'frothing_of_mouth', 'frothing', 'gaseous_stomach', 'highly_diarrhoea',
    'high_pulse_rate', 'high_temp', 'high_proportion', 'hyperaemia',
    'hydrocephalus', 'isolation_from_herd', 'infertility',
    'intermittent_fever', 'jaundice', 'ketosis', 'loss_of_appetite',
    'lameness', 'lack_of-coordination', 'lethargy', 'lacrimation',
    'milk_flakes', 'milk_watery', 'milk_clots', 'mild_diarrhoea', 'moaning',
    'mucosal_lesions', 'milk_fever', 'nausea', 'nasel_discharges', 'oedema',
    'pain', 'painful_tongue', 'pneumonia', 'photo_sensitization',
    'quivering_lips', 'reduction_milk_vields', 'rapid_breathing',
    'rumenstasis', 'reduced_rumination', 'reduced_fertility', 'reduced_fat',
    'reduces_feed_intake', 'raised_breathing', 'stomach_pain', 'salivation',
    'stillbirths', 'shallow_breathing', 'swollen_pharyngeal', 'swelling',
    'saliva', 'swollen_tongue', 'tachycardia', 'torticollis',
    'udder_swelling', 'udder_heat', 'udder_hardeness', 'udder_redness',
    'udder_pain', 'unwillingness_to_move', 'ulcers', 'vomiting',
    'weight_loss', 'weakness'
];

const form = document.getElementById('Form');

symptoms.forEach(symptom => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = symptom; // Name and value are the same
    checkbox.value = symptom;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + symptom)); // Add text after checkbox
    form.appendChild(label);
});