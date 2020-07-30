export default async function () {
    
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        team: await this.load('./templates/catalog/team.hbs')
    };

    const data = Object.assign({}, this.app.userData);
    data.teams=[
        {
            _id:'1',
            name : 'Cherry',
            comment : 'Some comment'
        },
        {
            _id:'2',
            name : 'Apple',
            comment : 'Some comment'
        },
        {
            _id:'3',
            name : 'Banana',
            comment : 'Some comment'
        }
    ];

    this.partial('./templates/catalog/teamCatalog.hbs', data);
};