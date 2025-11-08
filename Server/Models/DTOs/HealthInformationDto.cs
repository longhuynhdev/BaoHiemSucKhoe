namespace ISD_Project.Server.Models.DTOs
{
    public class HealthInformationDto
    {
        public double Height { get; set; }
        public double Weight { get; set; }
        public bool Smoking { get; set; }
        public int CigarettesPerDay { get; set; }
        public bool AlcoholConsumption { get; set; }
        public int DaysPerWeekAlcohol { get; set; } // Số ngày uống rượu / bia trong tuần
        public bool DrugUse { get; set; } //Chất gây nghiện
        public bool EngagesInDangerousSports { get; set; } // Thể thao mạo hiểm
        public string DangerousSportsDetails { get; set; } = String.Empty; // Chi tết thể thao mạo hiểm tham gia
        public bool DiagnosedWithHealthConditions { get; set; } //chẩn đoán: Ung thư, dị sản (ung thư tại chỗ), suy thận, đái tháo đường, HIV/AIDS, đột quỵ, cơn thiếu máu não thoáng qua hoặc bất kỳ bệnh nào liên quan đến tim
        public bool HasSpecificHealthConditions { get; set; }
        public bool ExperiencedDiseasesInLast5Years { get; set; }
        public string ExperiencedDiseasesDetails { get; set; } = String.Empty;
        public bool UnexplainedWeightLoss { get; set; }
        public string UnexplainedWeightLossDetails { get; set; } = String.Empty;
        public DateTime LastUpdate { get; set; }
        public int CustomerId { get; set; }
    }
}
