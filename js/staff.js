function Staffs(account, name, email, password, workDay, basicSalary, position, hourOfMonth) {
    this.account = account,
        this.name = name,
        this.email = email,
        this.password = password,
        this.workDay = workDay,
        this.basicSalary = basicSalary,
        this.position = position,
        this.hourOfMonth = hourOfMonth,


        this.calcSalary = function () {
            var sumSalary = 0;
            if (position == 'Giám đốc') {
                sumSalary = Number(basicSalary * 3)
            } else if (position == 'Trưởng phòng') {
                sumSalary = Number(basicSalary * 2)
            } else if (position == 'Nhân viên') {
                sumSalary = Number(basicSalary * 1)
            }
            return Number(sumSalary)
        }
    this.classifiStaff = function () {
        var output = '';
        if (Number(hourOfMonth) >= 192) {
            output = 'Xuất sắc'
        } else if (Number(hourOfMonth) >= 176) {
            output = 'Giỏi'
        } else if (Number(hourOfMonth) >= 160) {
            output = 'Khá'
        } else if (Number(hourOfMonth) < 160) {
            output = 'Trung bình'
        }
        return output
    }
    this.arrayStaff = [this.account, this.name, this.email, this.workDay, this.position, this.calcSalary(), this.classifiStaff()];
}