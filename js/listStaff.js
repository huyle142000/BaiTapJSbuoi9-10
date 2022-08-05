function ListStaffs() {
    this.listStaffs = [];
};
ListStaffs.prototype.outputSalary = function () {
    var staffs = this.listStaffs.length;
    for (var i = 0; i < staffs; i++) {
        this.listStaffs[i].calcSalary();
    }
}
ListStaffs.prototype.addStaff = function (nameStaff) {
    this.listStaffs.push(nameStaff)
}
ListStaffs.prototype.amountOfStaff = function (nameStaff) {
    return this.listStaffs.length
}
ListStaffs.prototype.prototypeStaff = function (nameStaff) {
    var staffs = this.listStaffs.length;

    for (var i = 0; i < staffs; i++) {
        this.listStaffs[i].arrayStaff;
    }
}

ListStaffs.prototype.foundStaff = function (account) {
    var indexFound = -1;
    this.listStaffs.map((sv, index) => {
        if (sv.account === account) {
            indexFound = index;
        }
        return;
    })
    return indexFound;
}
ListStaffs.prototype.arrayStaffByData = function (data) {
    var staffMatch = [];
    this.listStaffs.map((sv, index) => {
        for (var i = 0; i < sv.arrayStaff.length; i++) {
            var toLowerCaseSVs = sv.arrayStaff[i];
            if (isNaN(toLowerCaseSVs)) {

                var toLowerCaseSV = toLowerCaseSVs.toLowerCase();
                if (toLowerCaseSV) {

                    if (toLowerCaseSV.indexOf(data.toLowerCase()) >= 0) {
                        return staffMatch.push(sv);
                    }

                }

            }

        }
    })
    return staffMatch;
}
ListStaffs.prototype.filterStaff = function (data) {
    var arrayMatch = this.arrayStaffByData(data);

    return arrayMatch;
}
ListStaffs.prototype.deleteStaff = function (account) {
    var indexStaff = this.foundStaff(account);
    if (indexStaff >= 0) {
        this.listStaffs.splice(indexStaff, 1);
    }

}
ListStaffs.prototype.update = function (staff) {
    var indexStaff = this.foundStaff(staff.account);
    if (indexStaff >= 0) {
        this.listStaffs[indexStaff] = staff
    }

}

