export default async function () {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        teamMember: await this.load('./templates/catalog/teamMembers.hbs'),
        teamControls: await this.load('./templates/catalog/teamControls.hbs')
    };

    const data = {
        _id: '1',
        name: 'Cherry',
        comment: 'Some comment',
        members: [{
                username: 'Peter'
            },
            {
                username: 'Stamat'
            },
            {
                username: 'Pena'
            }
        ]
    };
    Object.assign(data, this.app.userData);

    this.partial('./templates/catalog/details.hbs', data);
};