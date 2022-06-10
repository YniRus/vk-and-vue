export const UTILS = {
  sortUsersByName(users) {
    const sortedUsers = JSON.parse(JSON.stringify(users));

    sortedUsers.sort((x, y) => {
      const xName = [x.first_name, x.last_name].join(' ');
      const yName = [y.first_name, y.last_name].join(' ');
      return xName.localeCompare(yName);
    });

    return sortedUsers;
  },
};
