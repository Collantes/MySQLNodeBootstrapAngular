
DELIMITER $$
DROP PROCEDURE IF EXISTS users_search ;

Create PROCEDURE users_search(_criteria varchar(150), _showDeleted bit  , _page INT, _pageSize INT )
BEGIN
	declare pageStart INT; declare wildCri varchar(500) ;
	set pageStart =_page * _pageSize;
	set wildCri =CONCAT('%',_criteria,'%');
	
	Select userId, username, isActive,firstName, lastName,createdOn, lastUpdatedOn, deletedOn
	From  users
	Where 
	(_showDeleted =1 or deletedOn is null)
	and (
		userId = _criteria
		or username like wildCri 
		or (firstName + ' ' + lastName) like wildCri
	)
	limit pageStart,_pageSize;
	
END $$
DELIMITER ;


#call users_search('',0,0,2);