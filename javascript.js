  // [].slice.call => converts HTMLCollection to Array
  const factionFilters = [].slice.call(document.querySelectorAll('[group="faction"]'));
  const roleFilters = [].slice.call(document.querySelectorAll('[group="role"]'));
  const rarityFilters = [].slice.call(document.querySelectorAll('[group="rarity"]'));
  const allFilters = factionFilters.concat(roleFilters, rarityFilters);
  const filterContents = [].slice.call(document.querySelectorAll('.filterDiv'));

  // add click event to all filters
  allFilters.forEach((filter) => {
    filter.addEventListener('click', filterToggle);
  });
    
  function filterToggle() {
    const filter = this.getAttribute('filter');
    const group = this.getAttribute('group');

    //toggle buttons inactive if pressed whilst active
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      applyFilter();
      return;
    } else resetButtons(group);

    this.classList.add('active');
    applyFilter();
  }

  //remove active status from buttons
  function resetButtons(name) {
   const groupName = [].slice.call(document.querySelectorAll('[group=' + name + ']'));
   groupName.forEach(filter => filter.classList.remove('active'));
  }
  
  //hide inactive herocards
  function resetFilterContent() {
    filterContents.forEach(content => content.classList.remove('show'));
  }

  function applyFilter() {
    let selectedFilters = [].slice.call(document.querySelectorAll('[filter].active')).map(filter => filter.getAttribute('filter'));
    const selector = ["filterDiv"].concat(selectedFilters).map(filter => '[class~="'+ filter +'"]').join('');
    filterText();
    document.querySelectorAll(selector).forEach(content => content.classList.add('show'));
  }
  
  applyFilter();

  //change text to list selected filters
  function filterText () {
    let selectedFilters = [].slice.call(document.querySelectorAll('[filter].active')).map(filter => filter.getAttribute('filter'));
    if (selectedFilters.length === 0) { document.getElementById("filterList").textContent = 'ALL HEROES';
    } else { document.getElementById("filterList").textContent = selectedFilters.join(', ') + ' HEROES';
    }
    resetFilterContent();
  }

  //searchbar
  function searchHeroes() {

    //reset all current active filters and text
    resetButtons('faction');
    resetButtons('role');
    resetButtons('rarity');
    resetFilterContent();
    filterText();

    let input = document.getElementById('searchBar').value.toLowerCase();
    let x = document.getElementsByClassName('filterDiv');
    for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
          x[i].classList.remove('show');
      }
      else {
          x[i].classList.add('show');                 
      }
  }
  }