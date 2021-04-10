function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;
      
      issuesList.innerHTML +=   '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                                '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
  }

  document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

  function saveIssues() {
      let issueId = chance.guid();
      let issueDesc = document.getElementById('issueDescInput').value;
      let issueSeverity = document.getElementById('issueSeverityInput').value;
      let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
      let issueStatus = 'Open';

      let issue = {
          id: issueId,
          description: issueDesc,
          severity: issueSeverity,
          assignedTo: issueAssignedTo,
          status: issueStatus
      }

      if (localStorage.getItem('issues') === null) {
          let issues = [];
          issues.push(issue);
          localStorage.setItem('issues', JSON.stringify(issues));
      } else {
          let issues = JSON.parse(localStorage.getItem('issues'));
          issues.push(issue);
          localStorage.setItem('issues', JSON.stringify(issues));
      }
      document.getElementById('issueInputForm').reset();

      fetchIssues();
      e.preventDefault();
  }