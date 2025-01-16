﻿// <auto-generated />
using System;
using Infrastructure.BingoContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(Bingo75Context))]
    [Migration("20250116153834_ChangeDefaultsAndRequireds")]
    partial class ChangeDefaultsAndRequireds
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Core.Entities.Card", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.PrimitiveCollection<string>("ContentMatrix")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SerialId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SerialId");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("Core.Entities.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("AutomaticRaffle")
                        .HasColumnType("bit");

                    b.Property<bool>("RandomPatterns")
                        .HasColumnType("bit");

                    b.Property<bool>("SharePrizes")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Core.Entities.GameCards", b =>
                {
                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.Property<int>("CardId")
                        .HasColumnType("int");

                    b.Property<bool>("Sold")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GameId", "CardId");

                    b.HasIndex("CardId");

                    b.ToTable("GameCards");
                });

            modelBuilder.Entity("Core.Entities.GamePatterns", b =>
                {
                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.Property<int>("PatternId")
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<double>("TargetPrice")
                        .HasColumnType("float");

                    b.HasKey("GameId", "PatternId");

                    b.HasIndex("PatternId");

                    b.ToTable("GamePatterns");
                });

            modelBuilder.Entity("Core.Entities.Pattern", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.PrimitiveCollection<string>("PatternMatrix")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PatternName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Patterns");
                });

            modelBuilder.Entity("Core.Entities.Prize", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CardId")
                        .HasColumnType("int");

                    b.Property<int>("PatternId")
                        .HasColumnType("int");

                    b.Property<double>("PrizeAmount")
                        .HasColumnType("float");

                    b.Property<int>("RoundId")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CardId");

                    b.HasIndex("PatternId");

                    b.HasIndex("RoundId");

                    b.ToTable("Prizes");
                });

            modelBuilder.Entity("Core.Entities.Round", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.PrimitiveCollection<string>("RaffleNumbers")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoundName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Rounds");
                });

            modelBuilder.Entity("Core.Entities.Serial", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BoxFillColor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BoxNumberColor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CardFillColor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CardNameColor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CardNumberColor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("CreationDate")
                        .HasColumnType("date");

                    b.Property<string>("SerialName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StrokeColor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Serials");
                });

            modelBuilder.Entity("Core.Entities.Card", b =>
                {
                    b.HasOne("Core.Entities.Serial", "Serial")
                        .WithMany()
                        .HasForeignKey("SerialId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Serial");
                });

            modelBuilder.Entity("Core.Entities.GameCards", b =>
                {
                    b.HasOne("Core.Entities.Card", "Card")
                        .WithMany("GameCards")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Game", "Game")
                        .WithMany("GameCards")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Card");

                    b.Navigation("Game");
                });

            modelBuilder.Entity("Core.Entities.GamePatterns", b =>
                {
                    b.HasOne("Core.Entities.Game", "Game")
                        .WithMany("GamePatterns")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Core.Entities.Pattern", "Pattern")
                        .WithMany("GamePatterns")
                        .HasForeignKey("PatternId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Game");

                    b.Navigation("Pattern");
                });

            modelBuilder.Entity("Core.Entities.Prize", b =>
                {
                    b.HasOne("Core.Entities.Card", "Card")
                        .WithMany("Prizes")
                        .HasForeignKey("CardId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Core.Entities.Pattern", "Pattern")
                        .WithMany("Prizes")
                        .HasForeignKey("PatternId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Entities.Round", "Round")
                        .WithMany("Prizes")
                        .HasForeignKey("RoundId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Card");

                    b.Navigation("Pattern");

                    b.Navigation("Round");
                });

            modelBuilder.Entity("Core.Entities.Round", b =>
                {
                    b.HasOne("Core.Entities.Game", "Game")
                        .WithMany()
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Game");
                });

            modelBuilder.Entity("Core.Entities.Card", b =>
                {
                    b.Navigation("GameCards");

                    b.Navigation("Prizes");
                });

            modelBuilder.Entity("Core.Entities.Game", b =>
                {
                    b.Navigation("GameCards");

                    b.Navigation("GamePatterns");
                });

            modelBuilder.Entity("Core.Entities.Pattern", b =>
                {
                    b.Navigation("GamePatterns");

                    b.Navigation("Prizes");
                });

            modelBuilder.Entity("Core.Entities.Round", b =>
                {
                    b.Navigation("Prizes");
                });
#pragma warning restore 612, 618
        }
    }
}
