using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Qualification
    {
        public int QualificationId { get; set; }
        public string QualificationType { get; set; } = string.Empty;
        public DateOnly YearCompleted { get; set; }
        public string Institution { get; set; } = string.Empty;
        public int? EmployeeId { get; set; }
        public Employee? Employee { get; set; }
    }
}